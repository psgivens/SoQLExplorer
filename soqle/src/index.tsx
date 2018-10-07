import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { applyMiddleware, createStore, Store as ReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { DatasourcesSaga } from './actions/DatasourcesSaga'
import { QueryExplorerSaga } from './actions/QueryExplorerSaga'
import App from './App';
import './index.css';
import * as state from './reducers'
import { reducers } from './reducers'
import registerServiceWorker from './registerServiceWorker';
import { DatabaseWorker } from './workers/DatabaseWorker'

const sagaMiddleware = createSagaMiddleware()
const store: ReduxStore<state.All> = createStore(reducers, state.initialState, applyMiddleware(sagaMiddleware))
const databaseWorker = new DatabaseWorker(store.dispatch)
const datasourcesManagementSaga = new DatasourcesSaga(databaseWorker)
sagaMiddleware.run(() => datasourcesManagementSaga.saga())
const queryExplorerSaga = new QueryExplorerSaga(databaseWorker)
sagaMiddleware.run(() => queryExplorerSaga.saga())



ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
