import React, { Component } from 'react';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';

class Comments extends Component {
  state = {
    comments: [],
    commentsCount: 1,
  };


    createComment = (comment) => {
      const commentItem = (
        <Comment
          key={this.state.commentsCount}
          { ...comment }
        />
      );
      const comments = this.state.comments.concat(commentItem);
      console.log(comments)
      this.setState({
        comments,
        commentsCount: this.state.commentsCount + 1,
      });
    };

    render() {
      return (
        <div>
          {this.state.comments}
          <h1>Agregar comentario</h1>
          <CommentForm
            createComment={this.createComment}
          />
        </div>
      );
    }
}

export default Comments;
