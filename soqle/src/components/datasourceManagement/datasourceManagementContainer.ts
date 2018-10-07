import * as redux from 'redux';
import { DatasourceManagementCommand, DatasourceManagementCommands } from '../../actions/DatasourcesSaga'
import { QueryDatasourceIdb } from '../../data/DataModels'
import * as state from '../../reducers/index'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    datasources: QueryDatasourceIdb[]
    datasource: QueryDatasourceIdb | void
}
  
export type ConnectedDispatch = {} & {
    selectItem?: (item: QueryDatasourceIdb) => void
    addItem?: (item: QueryDatasourceIdb) => void
    deleteItem?: (id: number) => void
    loadItems?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
    datasource: state1.selectedDatasource,
    datasources: state1.datasources    
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<DatasourceManagementCommand>): ConnectedDispatch => ({
  addItem: (item:QueryDatasourceIdb) => dispatch(DatasourceManagementCommands.addItem(item)),
  deleteItem: (id: number) => dispatch(DatasourceManagementCommands.deleteItem(id)),
  loadItems: () => dispatch(DatasourceManagementCommands.loadItems()),
  selectItem: (item:QueryDatasourceIdb) => dispatch(DatasourceManagementCommands.selectItem(item))
})
