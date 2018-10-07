import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
import { DatabaseCommand, DatabaseEvent, QueryDatasourceIdb } from '../data/DataModels'
import { DatabaseWorker } from '../workers/DatabaseWorker'
import { FetchExampleCommands, FetchExampleSaga } from './FetchExampleSaga'

export type DatasourceManagementCommand = {
    type: "DATASOURCE_LOADITEMS"
} | {
    type: "DATASOURCE_ADDITEM"
    item: QueryDatasourceIdb
} | {
    type: "DATASOURCE_DELETEITEM"
    id: number
} | {
    type: "DATASOURCE_TESTIP" 
}

export const DataSourceManagementCommands = {
    addItem: (item: QueryDatasourceIdb):DatasourceManagementCommand => ({ type: "DATASOURCE_ADDITEM", item }),
    deleteItem: (id: number):DatasourceManagementCommand => ({ type: "DATASOURCE_DELETEITEM", id }),
    loadItems: ():DatasourceManagementCommand => ({ type: "DATASOURCE_LOADITEMS" })
} 

export type DatasourceManagementEvent = {
    type: "DATASOURCE_ITEMSLOADED"
    items: QueryDatasourceIdb []
} | {
    type: "DATASOURCE_ITEMADDED"    
    item: QueryDatasourceIdb
} | {
    type: "DATASOURCE_DELETED"    
    id: number
} | {
    type: "DATASOURCE_IP_FAILED"
} | {
    type: "DATASOURCE_IP_SUCCESS"
    ip: string
}

/************************ SAGA *********************/


export class DatasourcesSaga {
    private databaseWorker:DatabaseWorker
    constructor (databaseWorker:DatabaseWorker) {
        this.databaseWorker = databaseWorker
        this.saga = this.saga.bind(this)
        this.addItem = this.addItem.bind(this)
        this.loadItems = this.loadItems.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('DATASOURCE_ADDITEM', (command:DatasourceManagementCommand) => this.addItem(command))
        yield takeEvery('DATASOURCE_DELETEITEM', (command:DatasourceManagementCommand) => this.deleteItem(command))
        yield takeEvery('DATASOURCE_LOADITEMS', (command:DatasourceManagementCommand) => this.loadItems(command))
    }

    private *addItem(action: DatasourceManagementCommand){

        // an 'if' block casts the action. 
        if (action.type === "DATASOURCE_ADDITEM") {

            const fetchSaga = new FetchExampleSaga()
            yield fetchSaga.testIp(FetchExampleCommands.fetchIp())

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

    private *deleteItem(action: DatasourceManagementCommand){

        // an 'if' block casts the action. 
        if (action.type === "DATASOURCE_DELETEITEM") {

            const fetchSaga = new FetchExampleSaga()
            yield fetchSaga.testIp(FetchExampleCommands.fetchIp())

            const event: DatabaseEvent = yield call((command: DatabaseCommand) => this.databaseWorker.post(command), { 
                id: action.id,
                type: "DELETE_DATASOURCE",
            } )

            if (event.type === "DATASOURCE_DELETED") {
                yield put( {
                    id: event.id,
                    type: "DATASOURCE_DELETED"
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
