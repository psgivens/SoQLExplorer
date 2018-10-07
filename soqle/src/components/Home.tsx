import * as React from 'react';

type BasicProps = {} & {}

const Home: React.SFC<BasicProps> = ( ) => 
  (<div className="container-fluid" >
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">
          Documentation
        </p>
        <p className="subtitle">
          Everything you need to <strong>create a website</strong> with Bulma
        </p>
      </div>
    </section>    
    <section className="section">
      <div className="container">
        <h1 className="title"> 
            Hello World!
        </h1>
        <p className="subtitle">
            My first website with <strong>Bulma</strong>!
        </p>
      </div>
    </section>
  </div>)

export default Home