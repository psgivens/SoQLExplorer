import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { CrudlSaga } from 'src/jscommon/actions/CrudlSaga'
import { CrudlDatabaseWorker } from 'src/jscommon/workers/CrudlDatabaseWorker'
import { QueryExplorerSaga } from './actions/QueryExplorerSaga';
import App from './App';
import './index.css';
import * as state from './reducers';
import { reducers } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { DatabaseWorker } from './workers/DatabaseWorker';



const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, state.initialState, applyMiddleware(sagaMiddleware))
const databaseWorker = new DatabaseWorker(store.dispatch)
const queryExplorerSaga = new QueryExplorerSaga(databaseWorker)
sagaMiddleware.run(() => queryExplorerSaga.saga())


// *********** Generic Patients Database Worker **************
const crudlDatabaseWorker = new CrudlDatabaseWorker(store.dispatch)

/* ... other sagas omitted. */

const datasourcesSaga = new CrudlSaga(crudlDatabaseWorker, "Datasources", "Datasources")
sagaMiddleware.run(() => datasourcesSaga.saga())

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
