import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { postReducer } from './postReducer'
import { rootWatcher } from '../saga'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  postReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootWatcher)
