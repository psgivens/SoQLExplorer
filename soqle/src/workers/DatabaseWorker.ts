import { Dispatch } from 'redux'
import { createWorker, ITypedWorker } from 'typed-web-workers'
import { DatabaseCommandEnvelope, DatabaseResponseEnvelope, execOnDatabase } from '../data/DataContext'
import { DatabaseCommand, DatabaseEvent } from '../data/DataModels'

type PromiseBack = {} & {
  resolve: (event:DatabaseEvent) => void
  reject: (error:any) => void
}
const promiseBacks: { [index:number]: PromiseBack } = {}

export type HandleDatabaseCommand = {} & {}

export class DatabaseWorker {
  private dispatch : Dispatch<any>
  private databaseWorker: ITypedWorker<DatabaseCommandEnvelope, DatabaseResponseEnvelope>
  constructor(dispatch: Dispatch<any>){
    this.dispatch = dispatch
    this.databaseWorker = createWorker(
      execOnDatabase, this.execOnUI)    
  }

  public post (command:DatabaseCommand): Promise<DatabaseEvent> {
    const correlationId = Math.floor(Math.random() * 1000000000000000)
    const cmdenv:DatabaseCommandEnvelope = { command, correlationId }
    const promise = new Promise<DatabaseEvent>((resolve,reject) => {
      promiseBacks[cmdenv.correlationId] = { reject, resolve }
      this.databaseWorker.postMessage(cmdenv)
    })
    return promise
  }

  private execOnUI (evtenv:DatabaseResponseEnvelope):void {
    if (evtenv.correlationId in promiseBacks) {
      const promiseBack = promiseBacks[evtenv.correlationId]
      delete promiseBacks[evtenv.correlationId]
      switch(evtenv.type){
        case "ERROR":
          promiseBack.reject(evtenv.error)
          break
        default:
          promiseBack.resolve(evtenv.event)
          break
      }
      // tslint:disable-next-line:no-console
      console.log("execOnUI: " + JSON.stringify(evtenv))
    } else if (evtenv.type === "EVENT") {
      this.dispatch(evtenv.event)
    } else {
      this.dispatch(evtenv.error)
    }
  }

}