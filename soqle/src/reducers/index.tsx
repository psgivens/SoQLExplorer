// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';
import { DatasourceManagementEvent } from '../actions/DatasourcesSaga'
import { QueryDatasourceIdb } from '../data/DataModels'


export type All = {} & {
    datasources: QueryDatasourceIdb[]
    editingDatasource: QueryDatasourceIdb | void
  }  

export const initialState:All = { 
  datasources: [],
  editingDatasource: undefined
}

function datasourceManagmentReducer(state:All, action: DatasourceManagementEvent): All {
    switch(action.type) {
        case "DATASOURCE_ITEMSLOADED":
            return { ...state, datasources: action.items }
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

export const reducers = reduceReducers( datasourceManagmentReducer)