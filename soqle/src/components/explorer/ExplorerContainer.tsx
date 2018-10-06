
import * as redux from 'redux';

import * as state from '../../reducers/index'

import { QueryDatasourceIdb } from '../../data/DataModels'

import { DatasourceManagementCommand, DataSourceManagementCommands } from '../../actions/DatasourcesSaga'

// import { CounterCommand, CounterCommands } from '../actions/CounterSaga'
// import { FetchCommand } from '../actions/ValuesSaga'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    counter?: number
    datasources: QueryDatasourceIdb[]
}
  
export type ConnectedDispatch = {} & {
    addItem?: (item: QueryDatasourceIdb) => void
    loadItems?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
    datasources: state1.datasources
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<DatasourceManagementCommand>): ConnectedDispatch => ({
  addItem: (item:QueryDatasourceIdb) => dispatch(DataSourceManagementCommands.addItem(item)),
  loadItems: () => dispatch(DataSourceManagementCommands.loadItems())
})
