import { 
    DatabaseCommand,
    DatabaseEvent, 
    // QueryDatasourceIdb 
} from './DataModels'

export type DatabaseCommandEnvelope = {} & {
    correlationId: number
    command: DatabaseCommand
}
  
export type DatabaseResponseEnvelope = {
    type:"ERROR"
    correlationId: number
    error: any
} | {
    type: "EVENT"
    correlationId: number
    event: DatabaseEvent
}
  
export const execOnDatabase = (cmdenv:DatabaseCommandEnvelope,callback:(result:DatabaseResponseEnvelope)=>void): void  => {
    const handleException1 = (msg:string) => (error:any):void => {
        //   // tslint:disable-next-line:no-console
        //   console.log("handleException (" + msg + ":")
        //   // tslint:disable-next-line:no-console
        //   console.log(error)
        //   // tslint:disable-next-line:no-console
        //   console.log(JSON.stringify(error))
        callback({
            correlationId: cmdenv.correlationId,

            // https://stackoverflow.com/questions/44815172/log-shows-error-object-istrustedtrue-instead-of-actual-error-data
            error: msg + (JSON.stringify(error, ["message", "arguments", "type", "name"])),
            type: "ERROR",
            })
        }

    const raiseEvent1 = (event:DatabaseEvent) => {
        callback({
        correlationId: cmdenv.correlationId,
        event,
        type: "EVENT"})
        }


    // **************************************************************
    // Custom database code beyond this point
    //
    // In any other language, this would be moved to a separate file.
    // **************************************************************

    const databaseName = "SoQLExplorer"
    const datasourceTableName = "Datasources"

    const handleDatabaseCommand = (
        command:DatabaseCommand, 
        raiseEvent:((event:DatabaseEvent)=>void),
        handleException:( (msg:string) =>((error:any)=>void) ) 
      ) => {
        const DBOpenRequest = indexedDB.open(databaseName, 1)
        DBOpenRequest.onerror = handleException("DBOpenRequest")

        let objectStore: IDBObjectStore
        DBOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const database: IDBDatabase = DBOpenRequest.result;

        if (event.oldVersion < 1){
            objectStore = database.createObjectStore(datasourceTableName, { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("idIdx", "id", { unique: true })
            objectStore.createIndex("startIdx", "startTime", { unique: false })
            objectStore.createIndex("titleIdx", "title", { unique: false })
        }
      };

      let db:IDBDatabase
      DBOpenRequest.onsuccess = (dbOpenEvent: Event) => {
          // store the result of opening the database in the db variable. This is used a lot below
          db = DBOpenRequest.result;

          // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
          const transaction: IDBTransaction = db.transaction([datasourceTableName], "readwrite");
          transaction.onerror = handleException("transaction")
          transaction.oncomplete = () => {
              // console.log("**DB** transaction.oncomplete")
          };

          objectStore = transaction.objectStore(datasourceTableName);

          switch(command.type){
              case "INSERT_DATASOURCE":

                  const objectStoreRequest: IDBRequest = objectStore.put(command.item)
                  objectStoreRequest.onerror = handleException("objectStoreRequest.onerror")
                  objectStoreRequest.onsuccess = () => 
                      raiseEvent({type: "DATASOURCE_INSERTED", item: command.item})
                  
                  break;

              case "LOAD_DATA":
                  const allItems: IDBRequest = db.transaction(datasourceTableName).objectStore(datasourceTableName).getAll()
                  allItems.onsuccess = (event:any) => {
                    raiseEvent({ type: "DATA_LOADED", datasources:event.target.result })
                  }

                //   const index: IDBIndex = db.transaction(datasourceTableName).objectStore(datasourceTableName).index("titleIdx")
                //   const boundKeyRange: IDBKeyRange = IDBKeyRange.bound("andy", "zed", false, true);

                //   // const index: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("startIdx")
                //   // const boundKeyRange: IDBKeyRange = IDBKeyRange.bound(new Date("2010-03-25T12:00:00Z"), new Date("2020-03-25T12:00:00Z"), false, true);

                //   const items:QueryDatasourceIdb[] = []
                //   index.openCursor(boundKeyRange).onsuccess = (event: any) => {
                //       const cursor = event.target.result;
                //       if (cursor) {
                //           items.push(cursor.value)
                //           cursor.continue();
                //       }
                //       else {
                //           raiseEvent({ type: "DATA_LOADED", datasources:items })
                //       }
                //   };
                  break
          };
      }
    }

    // **************************************************************
    // End of custom code.
    // **************************************************************

    try {
      handleDatabaseCommand(cmdenv.command, raiseEvent1, handleException1)
    }
    catch (e) {
        handleException1("main body")(e)
    }
  }




