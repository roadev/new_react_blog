import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { findIndex, set } from 'lodash/fp';
import { fromJS, List } from 'immutable';
import Dialog from 'react-toolbox/lib/dialog';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { endpoints } from '../../constants';


class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    postsData: ImmutablePropTypes.map.isRequired,
  }

  state = {
    showForm: false,
    post: undefined,
    showDialog: false,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  componentWillReceiveProps(nextProps){
    const { fetchPosts } = this.props;
    const { postsData } = nextProps;
    if (!postsData.get('postsLoading') && postsData.get('refresh')){
      fetchPosts();
    }
  }

  createPost = (post) => {
    const { createPost } = this.props;
    this.handleCloseForm(() => createPost(post.toJS()));
  };

  handleEditPost = (post) => {
    const { updatePost } = this.props;
    this.handleCloseForm(() => updatePost(post.toJS()));
  };

  handleConfirmDelete = () => {
    const {post} = this.state;
    const { deletePost } = this.props;
    deletePost(post.toJS());
    this.setState({ showDialog: false });
  }

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



  render() {
    const { postsData } = this.props;
    const posts = postsData.get('posts');

    const postsItems = posts.map(post => (
      <Post
          key={post.get('_id')}
          id={post.get('_id')}
          post={post}
          editPost={this.handleEditPostForm}
          deletePost={this.handleDeletePost}
        />
    )).toJS();

    const actions = [
      { label: "Cancel", onClick: this.handleCloseForm },
      { label: "Confirm", onClick: this.handleConfirmDelete }
    ];

    return (
      <div>
        {postsItems}
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
