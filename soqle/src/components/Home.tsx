import * as React from 'react';

type BasicProps = {} & {}

const Home: React.SFC<BasicProps> = ( ) => 
  (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          SoQL Explorer
        </p>
        <p className="subtitle">
          An in browser query tool for <strong>Socrata Query Language</strong>.
        </p>
      </div>
    </section>    
    <section className="section">
      <div className="container">
        <p>
          Currently implemented
          <ul>
            <li>Datasource management tools</li>
            <li>SoQL editor</li>
          </ul>
        </p>
        <p>
          Comming soon
          <ul>
            <li>Error handling</li>
            <li>Datasource test-connection feature</li>
            <li>History</li>
            <li>UI improvements</li>
          </ul>
        </p>
      </div>
    </section>
  </div>)

export default Home