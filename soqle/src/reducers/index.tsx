// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';
import { DatasourceManagementEvent } from '../actions/DatasourcesSaga'
import { QueryExplorerEvent } from '../actions/QueryExplorerSaga';
import { QueryDatasourceIdb } from '../data/DataModels'


export type All = {} & {
    datasources: QueryDatasourceIdb[]
    editingDatasource: QueryDatasourceIdb | void
    selectedDatasource: QueryDatasourceIdb | void
    searchResults: object[]
  }  

export const initialState:All = { 
  datasources: [],
  editingDatasource: undefined,
  searchResults: [{
    id: "1",
    lastUsed: 1,
    name: "table",
    result: "table name"
  }],
  selectedDatasource: undefined,  
}

function datasourceManagmentReducer(state:All, action: DatasourceManagementEvent): All {
    switch(action.type) {
        case "DATASOURCE_ITEMSLOADED":
            return { ...state, datasources: action.items }
        case "DATASOURCE_ITEMSELECTED":
            return {...state, selectedDatasource: action.item}
        case "DATASOURCE_ITEMADDED":
            const addedId = action.item.id
            return { ...state, datasources:[
                ...state.datasources.filter(ds => ds.id !== addedId), action.item]}
        case "DATASOURCE_DELETED":
            const deleteId = action.id
            return { ...state, datasources:[
                ...state.datasources.filter(ds => ds.id !== deleteId)]}    
        default:
            return state
    }
}

function queryExplorerReducer(state:All, action: QueryExplorerEvent): All {
    switch(action.type) {
        case "QUERYEXPLORER_QUERY_SUCCESS":
            return {...state, searchResults: action.values}
        default:
            return state
    }
}

export const reducers = reduceReducers(datasourceManagmentReducer, queryExplorerReducer)