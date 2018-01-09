import { fromJS } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

export const initialState = fromJS({
  posts: [],
  refresh: false,
  postsLoading: false,
});

export default function postsData(state = initialState, action) {
  console.log(state.get('postsLoading'), state.get('posts'));
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_POSTS: {
      console.log(action.posts);
      const posts = fromJS(action.posts);
      return state.withMutations(map => {
        map.set('posts', posts)
          .set('refresh', false);
      });
    }
    case ACTION_TYPES.REFRESH_POSTS:
      return state.set('refresh', true);
    case ACTION_TYPES.TOGGLE_POSTS_LOADING:
      return state.set('postsLoading', !state.get('postsLoading'));
    case ACTION_TYPES.RESET_POSTS:
      return initialState;
    default:
      return state;
  }
}
