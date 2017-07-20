import fetch from 'isomorphic-fetch'

/**
 * Action creators
 */

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
/**
 * An action to select a subreddit by its name.
 * @param  {status} subreddit
 * @return {ActionCreator}
 */
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
/**
 * An action when a user selected an invalidate subreddit id.
 * @param  {status} subreddit
 * @return {ActionCreator}
 */
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
/**
 * An action when a user issued an request of subreddit's posts.
 * @param  {status} subreddit
 * @return {ActionCreator}
 */
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
/**
 * An action when the subreddit's posts downloaded.
 * @param  {status} subreddit
 * @param  {json} json
 * @return {ActionCreator}
 */
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

/**
 * Fetch the subreddit's posts. A thunk action creator.
 * This function has side effects.
 * @param  {status} subreddit
 * @return {ActionCreator}
 */
export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json())
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      );
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}
