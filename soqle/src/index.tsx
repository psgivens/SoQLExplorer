import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, Store as ReduxStore } from 'redux'

import * as state from './reducers'

import { reducers } from './reducers'

import { applyMiddleware } from 'redux'

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import createSagaMiddleware from 'redux-saga'

import { DatasourcesSaga } from './actions/DatasourcesSaga'

import { DatabaseWorker } from './workers/DatabaseWorker'

const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<state.All> = createStore(reducers, state.initialState, applyMiddleware(sagaMiddleware))

const databaseWorker = new DatabaseWorker(store.dispatch)

const datasourcesManagementSaga = new DatasourcesSaga(databaseWorker)
sagaMiddleware.run(() => datasourcesManagementSaga.saga())
// sagaMiddleware.run(createPomodoroSaga(store.dispatch))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
