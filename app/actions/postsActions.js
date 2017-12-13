import { assign } from 'lodash/fp';
import { endpoints } from '../constants';
export const receivePosts = (posts) => (
  {
    type: 'RECEIVE_POSTS',
    posts,
  }
);

export const refreshPosts = () => (
  {
    type: 'REFRESH_POSTS',
  }
);

export const togglePostsLoading = () => ({
  type: 'TOGGLE_POSTS_LOADING',
});


export function updatePost(post) {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch(`${endpoints.posts}/${post.id}`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post),
    }).then(response => {
      dispatch(togglePostsLoading());
      dispatch(refreshPosts());
    });
  };
}

export function deletePost(post) {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch(`${endpoints.posts}/${post.id}`, {
      method: 'DELETE',
    }).then(response => {
      dispatch(togglePostsLoading());
      dispatch(refreshPosts());
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assign({}, post)),
    })
    .then(response => {
      dispatch(togglePostsLoading());
      dispatch(refreshPosts());
    });
  };
}


export function fetchPosts() {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch('http://localhost:3000/posts', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePosts(json));
      dispatch(togglePostsLoading());
    });
  };
}
