import * as React from 'react';
import { connect } from 'react-redux';
import { QueryDatasourceIdb } from '../data/DataModels'
import * as container from './explorer/ExplorerContainer'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

/*************** TODO Remove *******************/
const SecondStyle = {
  backgroundColor: "green"
}

/*************** end Remove *******************/

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
}

class ExplorerComp extends React.Component<ThisProps, ComponentState> {
// const PomodoroManagementComp: React.SFC<ThisProps> = ( {pomodoros}:ThisProps ) => 
constructor (props:ThisProps) {
  super (props)
  this.state = {
  }
  // this.onActualChange = this.onActualChange.bind(this)
  // this.onPlannedChange = this.onPlannedChange.bind(this)
  // this.onClick = this.onClick.bind(this)

  // this.props.loadItems!()
}

  public render () {
  return (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body" style={SecondStyle}>
        <p className="title" style={SecondStyle}>
          Explorer
        </p>
        <p className="subtitle">
          List and edit <strong>Pomodoros</strong>
        </p>
      </div>
    </section>    
    <section className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Url</th>
            <th>Last Used</th>
          </tr>
        </thead>
        <tbody>

        {this.props.datasources.map((datasource:QueryDatasourceIdb)=>
          <tr key={datasource.id}>
            <td>{datasource.title}</td>
            <td>{datasource.url}</td>
            <td>{(new Date(datasource.lastUsed)).toLocaleString()}</td>
          </tr>)}

        </tbody>
      </table>
    </section>
  </div>)
  }
}

export default connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (ExplorerComp)
