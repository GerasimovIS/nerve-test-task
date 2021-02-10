import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_POSTS, setPostsAction } from '../store/postReducer'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min))

function getPosts (limit = 10) {
  return fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
    .then(response => response.json())
}

function * setPostsToLS (posts) {
  localStorage.setItem('ls_posts', JSON.stringify(posts))
}

function * clearPostsLS () {
  localStorage.removeItem('ls_posts')
}

function * fetchPostsWorker (action) {
  while (true) {
    const posts = yield call(getPosts, getRandomInt(10, 30))
    yield put(setPostsAction(posts))
    yield * setPostsToLS(posts)
    yield call(wait, 1000 * 60 * 5)
    yield * clearPostsLS()
  }
}

export function * postsWatcher () {
  yield takeEvery(FETCH_POSTS, fetchPostsWorker)
}
