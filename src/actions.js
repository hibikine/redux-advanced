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
    receivedAt.now()
  };
}

/**
 * Fetch the subreddit's posts. A thunk action creator.
 * This function has side effects.
 * @param  {status} subreddit
 * @return {ActionCreator}
 */
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
