import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { findIndex, set } from 'lodash/fp';
import { fromJS, List } from 'immutable';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { endpoints } from '../../constants';
import Dialog from 'react-toolbox/lib/dialog';

class Posts extends Component {

  state = {
    posts: List(),
    showForm: false,
    post: undefined,
    showDialog: false,
  };

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const response = await fetch(endpoints.posts);
    const posts = await response.json();
    this.setState({ posts: fromJS(posts) });
  }

  createPost = (post) => {
    fetch(endpoints.posts, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post.toJS()),
    });
    this.handleCloseForm();
  };

  handleEditPost = (post) => {
    fetch(`${endpoints.posts}/${post.get('id')}`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post.toJS()),
    });
    this.handleCloseForm();
  };

  handleEditPostForm = (id, post) => {
    this.setState({
      showForm: true,
      post: post
        .set('id', id)
        .set('updated_at', Date()),
    });
  };


  handleDeletePost = (id, post) => {
    this.setState({
      showDialog: true,
      post: post.set('id', id)
    })
  }

  handleShowForm = () => {
    this.setState({ showForm: true });
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, post: undefined });
  };

  handleCloseDialog = () => {
    this.setState({ showDialog: false, post: undefined })
  }

  handleConfirmDelete = () => {
    const {post} = this.state;
    fetch(`${endpoints.posts}/${post.get('id')}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });
    this.setState({ showDialog: false });
  }

  render() {

    const posts = this.state.posts.map(post => (
      <Post
        key={post.get('_id')}
        id={post.get('_id')}
        post={post}
        editPost={this.handleEditPostForm}
        deletePost={this.handleDeletePost}
      />
    )).toJS();


    // const posts = this.state.posts.length > 0 ?
    // (
    //   this.state.posts
    // ) :
    // (
    //   <div>
    //     No hay posts
    //   </div>
    // );


    const actions = [
      { label: "Cancel", onClick: this.handleCloseForm },
      { label: "Confirm", onClick: this.handleConfirmDelete }
    ];

    return (
      <div>
        {posts}
        <PostForm
          active={this.state.showForm}
          createPost={this.createPost}
          editPost={this.handleEditPost}
          closeForm={this.handleCloseForm}
          post={this.state.post}
        />
        <Button
          icon="add"
          label="Create post"
          onClick={this.handleShowForm}
        />

        <Dialog
         actions={actions}
         active={this.state.showDialog}
         onEscKeyDown={this.handleCloseDialog}
         onOverlayClick={this.handleCloseDialog}
         title='Confirmación de eliminación'
       >
         <p>¿Esta seguro que desea eliminar?</p>
       </Dialog>
      </div>
    );
  }

}

export default Posts;
