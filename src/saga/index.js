import { all } from 'redux-saga/effects'
import { postsWatcher } from './postSaga'

export function * rootWatcher () {
  yield all([postsWatcher()])
}
