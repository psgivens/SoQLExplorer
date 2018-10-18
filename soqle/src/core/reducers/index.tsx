import { combineReducers } from 'redux'
import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands'
import { crudlReducer, CrudlState } from 'src/jscommon/reducers/CrudlReducers'
import { QueryExplorerEvent } from '../actions/QueryExplorerSaga'

export type All = {} & {
    datasources: CrudlState,
    searchResults: CrudlEntity[]
  }  

export const initialState:All = { 
  datasources: {
    editingItem: undefined,
    items: [],
    selectedItem: undefined
  },
  searchResults: [],
}

function queryExplorerReducer(state:CrudlEntity[] = [], action: QueryExplorerEvent): CrudlEntity[] {
    switch(action.type) {
        case "QUERYEXPLORER_QUERY_SUCCESS":
            return action.values as CrudlEntity[]
        default:
            return state
    }
}

export const reducers = combineReducers({
    datasources: crudlReducer("Datasources"),
    searchResults: queryExplorerReducer
})
