const defaultState = {
  posts: []
}

export const SET_POSTS = 'SET_POSTS'
export const FETCH_POSTS = 'FETCH_POSTS'

export function postReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: [...action.payload] }
    default:
      return state
  }
}

export const setPostsAction = (payload) => ({ type: SET_POSTS, payload })
export const fetchPostsAction = () => ({ type: FETCH_POSTS })
