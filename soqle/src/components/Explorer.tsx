import * as React from 'react';
import { connect } from 'react-redux';
import Utils from '../Utils'
import * as container from './explorer/ExplorerContainer'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

// TODO: Add error-boundaries
// https://reactjs.org/docs/error-boundaries.html

type ComponentState = {} & {
  soql: string
}

class ExplorerComp extends React.Component<ThisProps, ComponentState> {
  // const PomodoroManagementComp: React.SFC<ThisProps> = ( {pomodoros}:ThisProps ) => 
  constructor (props:ThisProps) {
    super (props)
    const query = Utils.getParameterByName('query', location.search)
    this.state = {
      soql: query ? query : 'SELECT * LIMIT 10'
    }
    //  WHERE record_id="PR0166398"

    // this.onActualChange = this.onActualChange.bind(this)
    // this.onPlannedChange = this.onPlannedChange.bind(this)
    // this.onClick = this.onClick.bind(this)

    // this.props.loadItems!()
  }

  public componentDidMount() {
    // const parsed = QueryString.parse(location.search);
    const items = {
      query: Utils.getParameterByName('query', location.search),
      site: Utils.getParameterByName('site', location.search)      
    }

    // tslint:disable-next-line:no-console
    console.log(items.query)

    // tslint:disable-next-line:no-console
    console.log(items)

    this.props.query!(
      this.props.datasource ? this.props.datasource.url : "https://data.lacounty.gov/resource/kpth-apsv.json", 
      this.state.soql)
  }

  public render () {
    const resultKeys = this.props.searchResults === undefined || this.props.searchResults[0] === undefined 
      ? [] 
      : Object.keys(this.props.searchResults[0])
    return (<div className="container-fluid" >
    <section className="section">
      <p>Url: { (this.props.datasource) ? this.props.datasource.url : "__" }</p>
      <p>Current Query: { Utils.getParameterByName('query', location.search) }</p>
      <form id="queryForm" action="Explorer" method="get">
        <input type="text" name="site" id="soqlQuerySource"
            style={ {width:"90%"} }
            defaultValue="https://data.lacounty.gov/resource/kpth-apsv.json" /><br />
        <textarea  id="soqlTextarea"
            name="query" style={ {width:"90%", height:"50px" } }
            defaultValue={this.state.soql}
            />
        <button className="btn btn-outline-success" type="submit">Execute SOQL</button>
      </form>

    </section>
    <section className="section">
      <table className="table">
        <thead>          
          <tr>
            <th>#</th>
            {
              resultKeys.map((k,i) => (<th key={i}>{k}</th>))
            }
          </tr>
        </thead>
        <tbody>
        {
          this.props.searchResults 
            ? this.props.searchResults.map((searchResult:any, i:number)=> 
              <tr key={i}>
                <td>{i}</td>
                {
                  resultKeys.map( (k,i2) => 
                    (<td key={i2}>{
                      typeof searchResult[k] === 'object'
                        ? "<object>"
                        : searchResult[k]
                    }</td>))
                }
              </tr>)
            : <tr key="1" />
          }
        </tbody>
      </table>
    </section>
  </div>)
  }
}

export default connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (ExplorerComp)
