// import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
// import { api } from '../apis'

import { DatabaseWorker } from '../workers/DatabaseWorker'

import { DatabaseCommand, DatabaseEvent } from '../data/DataModels'

import { QueryDatasourceIdb } from '../data/DataModels'

export type DatasourceManagementCommand = {
    type: "DATASOURCE_LOADITEMS"
} | {
    type: "DATASOURCE_ADDITEM"
    item: QueryDatasourceIdb
} 

export const DataSourceManagementCommands = {
    addItem: (item: QueryDatasourceIdb):DatasourceManagementCommand => ({ type: "DATASOURCE_ADDITEM", item }),
    loadItems: ():DatasourceManagementCommand => ({ type: "DATASOURCE_LOADITEMS" })
} 

export type DatasourceManagementEvent = {
    type: "DATASOURCE_ITEMSLOADED"
    items: QueryDatasourceIdb []
} | {
    type: "DATASOURCE_ITEMADDED"    
    item: QueryDatasourceIdb
} | {
    type: "FETCH_FAILED"
}

/************************ SAGA *********************/


export class DatasourcesSaga {
    private databaseWorker:DatabaseWorker
    constructor (databaseWorker:DatabaseWorker) {
        this.databaseWorker = databaseWorker
        this.saga.bind(this)
        this.addItem.bind(this)
        this.loadItems.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('DATASOURCE_ADDITEM', (command:DatasourceManagementCommand) => this.addItem(command))
        yield takeEvery('DATASOURCE_LOADITEMS', (command:DatasourceManagementCommand) => this.loadItems(command))
    }

    private *addItem(action: DatasourceManagementCommand){

        // an 'if' block casts the action. 
        if (action.type === "DATASOURCE_ADDITEM") {
            const event: DatabaseEvent = yield call((command: DatabaseCommand) => this.databaseWorker.post(command), { 
                item:action.item,
                type: "INSERT_DATASOURCE",
            } )

            if (event.type === "DATASOURCE_INSERTED") {
                yield put( {
                    item: event.item,
                    type: "DATASOURCE_ITEMADDED"
                })
            }
        }  
    }

    private *loadItems(action: DatasourceManagementCommand){
        
        if (action.type === "DATASOURCE_LOADITEMS") {
            const event: DatabaseEvent = yield call((command: DatabaseCommand) => this.databaseWorker.post(command), { 
                type: "LOAD_DATA",
            } )

            if (event.type === "DATA_LOADED") {
                if (event.datasources){
                    yield put( {
                        items: event.datasources ? event.datasources : [],
                        type: "DATASOURCE_ITEMSLOADED"
                    })
                } else {
                    yield put( {
                        items: [],
                        type: "DATASOURCE_ITEMSLOADED"
                    })
                }
            }
        }  
    }

}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
// export const pomodoroSaga = (dispatch: Dispatch<PomodoroCommand>, databaseWorker:DatabaseWorker): PomodoroSaga => new PomodoroSaga(databaseWorker)

// export default pomodoroSaga
