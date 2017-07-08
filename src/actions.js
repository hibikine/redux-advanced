import fetch from 'isomorphic-fetch'

/**
 * Action creators
 */

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data/children.map(child => child.data),
    receivedAt.now()
  };
}

export function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit))

    return fetct(`https://www,reddit.com/r/${subreddit}.json`)
      .then(
        response => responce.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispath(receivePosts(subreddit, json))
      );
  }
}
