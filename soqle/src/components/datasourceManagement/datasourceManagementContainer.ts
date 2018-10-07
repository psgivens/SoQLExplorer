import * as redux from 'redux';
import { DatasourceManagementCommand, DataSourceManagementCommands } from '../../actions/DatasourcesSaga'
import { QueryDatasourceIdb } from '../../data/DataModels'
import * as state from '../../reducers/index'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
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
