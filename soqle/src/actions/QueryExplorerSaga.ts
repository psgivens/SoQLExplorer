import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
import { api } from '../apis/index'
import { DatabaseWorker } from '../workers/DatabaseWorker'

export type QueryExplorerCommand = {
    type: "QUERYEXPLORER_QUERY"
    soql: string
    url: string
} | {
    type: "DATASOURCE_TESTIP" 
}

export const QueryExplorerCommands = {
    query: (url:string, soql: string):QueryExplorerCommand => ({ type: "QUERYEXPLORER_QUERY", url, soql }),
} 

export type QueryExplorerEvent = {    
    type: "QUERYEXPLORER_QUERY_FAILED"
} | {
    type: "QUERYEXPLORER_QUERY_SUCCESS"
    values: Array<unknown>
}

/************************ SAGA *********************/


export class QueryExplorerSaga {
    // private databaseWorker:DatabaseWorker
    constructor (databaseWorker:DatabaseWorker) {
        // this.databaseWorker = databaseWorker
        this.saga = this.saga.bind(this)
        this.query = this.query.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('QUERYEXPLORER_QUERY', (command:QueryExplorerCommand) => this.query(command))
    }

    private *query(action: QueryExplorerCommand){

        // an 'if' block casts the action. 
        if (action.type === "QUERYEXPLORER_QUERY") {

            const queryResults: any[] = yield call(api.querySocrata, action.url, action.soql)

            // tslint:disable-next-line:no-console
            console.log("===========queryResults=============")

            // tslint:disable-next-line:no-console
            console.log(queryResults)

            yield put( { 
                type: "QUERYEXPLORER_QUERY_SUCCESS",
                values: queryResults
            })
        }
    }

}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
// export const pomodoroSaga = (dispatch: Dispatch<PomodoroCommand>, databaseWorker:DatabaseWorker): PomodoroSaga => new PomodoroSaga(databaseWorker)

// export default pomodoroSaga
