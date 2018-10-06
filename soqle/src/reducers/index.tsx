// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';
import { QueryDatasourceIdb } from '../data/DataModels'

import { DatasourceManagementEvent } from '../actions/DatasourcesSaga'

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
            return { ...state, datasources:[...state.datasources, action.item]}
        default:
            return state
    }
}

export const reducers = reduceReducers( datasourceManagmentReducer)