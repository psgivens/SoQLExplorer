import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../controls/Button'
import Hidden from '../controls/Hidden'
import TextInput from '../controls/TextInput'
import { QueryDatasourceIdb } from '../data/DataModels'
import * as container from './datasourceManagement/datasourceManagementContainer'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps


/*************** TODO Remove *******************/
const SecondStyle = {
  backgroundColor: "green"
}

/*************** end Remove *******************/

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  editDatasource: {
    id: number
    title: string
    description: string
    apiKey: string
    apiSecret: string
    url: string
  }
}

class DatasourceManagementComp extends React.Component<ThisProps, ComponentState> {
// const PomodoroManagementComp: React.SFC<ThisProps> = ( {pomodoros}:ThisProps ) => 
constructor (props:ThisProps) {
  super (props)
    // this.state = {
    // }

  this.state = {
    editDatasource: {
      apiKey: "",
      apiSecret: "",
      description: "",
      id: 0,
      title: "",      
      url: ""
    }
  }
  this.onTitleChanged = this.onTitleChanged.bind(this)
  this.onUrlChanged = this.onUrlChanged.bind(this)
  this.onApiKeyChanged = this.onApiKeyChanged.bind(this)
  this.onApiSecretChanged = this.onApiSecretChanged.bind(this)
  this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
  this.onSubmitPressed = this.onSubmitPressed.bind(this)


  // this.onActualChange = this.onActualChange.bind(this)
  // this.onPlannedChange = this.onPlannedChange.bind(this)
  // this.onClick = this.onClick.bind(this)

  this.props.loadItems!()
}

  public render () {
  return (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body" style={SecondStyle}>
        <p className="title" style={SecondStyle}>
          Datasource Management
        </p>
        <p className="subtitle">
          List and edit <strong>Pomodoros</strong>
        </p>
      </div>
    </section>    
    <section className="section">
      <Hidden
        name="id"
        value={this.state.editDatasource.id} />
      <TextInput
        inputType="text"
        label="Title"
        name="title"
        placeholder="Enter a title for the datasource"
        value={this.state.editDatasource.title}
        onChange={this.onTitleChanged} />
      <TextInput
        inputType="text"
        label="URL"
        name="url"
        placeholder="Enter a url for the datasource"
        value={this.state.editDatasource.url}
        onChange={this.onUrlChanged} />        
      <TextInput
        inputType="text"
        label="Api Key"
        name="apiKey"
        placeholder="Enter a API key for the datasource"
        value={this.state.editDatasource.apiKey}
        onChange={this.onApiKeyChanged} />                
      <TextInput
        inputType="text"
        label="Api Secret"
        name="apiSecret"
        placeholder="Enter a API secret for the datasource"
        value={this.state.editDatasource.apiSecret}
        onChange={this.onApiSecretChanged} />                        
      <TextInput
        inputType="text"
        label="Description"
        name="description"
        placeholder="Enter a description for the datasource"
        value={this.state.editDatasource.description}
        onChange={this.onDescriptionChanged} />                                
        <Button onClick={this.onSubmitPressed} text="Submit Change" />
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

  private onTitleChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editDatasource: {...this.state.editDatasource, title: event.currentTarget.value}})    
  }

  private onUrlChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editDatasource: {...this.state.editDatasource, url: event.currentTarget.value}})    
  }

  private onDescriptionChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editDatasource: {...this.state.editDatasource, description: event.currentTarget.value}})    
  }

  private onApiKeyChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editDatasource: {...this.state.editDatasource, apiKey: event.currentTarget.value}})    
  }

  private onApiSecretChanged (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, editDatasource: {...this.state.editDatasource, apiSecret: event.currentTarget.value}})    
  }

  private onSubmitPressed (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    this.props.addItem!(
      { ...this.state.editDatasource, id:0, lastStatus: "None", lastUsed:0 }
    )
  }

}

export default connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (DatasourceManagementComp)
