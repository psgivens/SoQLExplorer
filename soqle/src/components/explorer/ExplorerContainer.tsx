import * as redux from 'redux';
import { QueryExplorerCommand, QueryExplorerCommands } from '../../actions/QueryExplorerSaga'
import { QueryDatasourceIdb } from '../../data/DataModels'
import * as state from '../../reducers/index'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    counter?: number
    datasource: QueryDatasourceIdb | void
    searchResults: object[]
}
  
export type ConnectedDispatch = {} & {
    query?: (url:string, soql:string) => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
    datasource: state1.datasources.selectedItem as QueryDatasourceIdb,
    searchResults: state1.searchResults
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<QueryExplorerCommand>): ConnectedDispatch => ({
  query: (url:string, soql:string) => dispatch(QueryExplorerCommands.query(url, soql))
})
