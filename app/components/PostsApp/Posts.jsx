import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { findIndex, set } from 'lodash/fp';
import { fromJS, List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { endpoints } from '../../constants';

class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    postsData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    // posts: List(),
    showForm: false,
    postToEdit: undefined,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts } = this.props;
    const { postsData } = nextProps;
    console.log(postsData.get('postsLoading'), postsData.get('refresh'));
    if (!postsData.get('postsLoading') && postsData.get('refresh')) {
      console.log('¡Entró!');
      fetchPosts();
    }
  }

  // async getPosts() {
  //   console.log(endpoints.posts);
  //   const response = await fetch(endpoints.posts);
  //   const posts = await response.json();
  //   this.setState({ posts: fromJS(posts) });
  //   console.log(posts);
  // }

  createPost = (post) => {
    const { createPost } = this.props;
    this.setState({ showForm: false }, () => createPost(post.toJS()));
    // const postItem = (
    //   <Post
    //     key={this.state.postsCount}
    //     id={this.state.postsCount}
    //     post={post}
    //     editPost={this.handleEditPostForm}
    //     deletePost={this.handleDeletePost}
    //   />
    // );
    // const posts = this.state.posts.concat(postItem);
    // this.setState({
    //   posts,
    //   postsCount: this.state.postsCount + 1,
    // }, () => this.handleCloseForm());
  };

  handleEditPost = (post) => {
    console.log("asjhdgajkhdsgj")
    console.log("entra")
    const postItem = (
      <Post
        key={post.get('id')}
        id={post.get('id')}
        post={post}
        editPost={this.handleEditPostForm}
        deletePost={this.handleDeletePost}
      />
    );
    console.log(postItem);
    console.log(post.get('id'));
    const index = findIndex(
      p => p.key === `${post.get('id')}`
    )(this.state.posts)
    const posts = set(
      index,
      postItem,
      this.state.posts,
    );
    console.log(posts);
    this.setState({ posts }, () => this.handleCloseForm());

  };

  handleEditPostForm = (id, post) => {
    this.setState({
      showForm: true,
      postToEdit: post
        .set('id', id)
        .set('updated_at', Date()),
    });
  };


  handleDeletePost = (id) => {
    const posts = this.state.posts
      .filter(p => p.key !== `${id}`);
    this.setState({ posts });
  }

  handleShowForm = () => {
    this.setState({ showForm: true });
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, postToEdit: undefined });
  };

  render() {
    const posts = this.props.postsData.get('posts');
    console.log(posts);
    const postItems = posts.map(post => (
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

    return (
      <div>
        {postItems}
        <PostForm
          active={this.state.showForm}
          createPost={this.createPost}
          editPost={this.handleEditPost}
          closeForm={this.handleCloseForm}
          post={this.state.postToEdit}
        />
        <Button
          icon="add"
          label="Create post"
          onClick={this.handleShowForm}
        />
      </div>
    );
  }

}

export default Posts;
