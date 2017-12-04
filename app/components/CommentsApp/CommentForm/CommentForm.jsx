import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { isNil } from 'lodash/fp';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';

class CommentForm extends Component {
  static propTypes = {
    post: ImmutablePropTypes.map,
    createComment: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  static commentState = () => fromJS({
    name: '',
    email: '',
    country: '',
    age: 0,
  });

  state = {
    commentState : CommentForm.commentState(),
  }

  handleChange = (name, value) => {
    const commentState =  this.state.commentState.set(name, value);
    this.setState({commentState});
  };


  handleCreateComment = () => {
    const { createComment } =  this.props;
    createComment(this.state.commentState.toJs());
  }

  render() {
    const { active, closeForm, comment } = this.props;
    const actions = [
      { label: "Cancel", onClick: closeForm },
      {
        label: isNil(comment) ? "Create" : "Update",
        onClick: isNil(comment) ? this.handleCreateComment : this.handleEditComment,
      }
    ];
    return (
        <Dialog
          actions={actions}
          active={active}
          onEscKeyDown={closeForm}
          onOverlayClick={closeForm}
          title='My awesome dialog'
        >
        <Input type='text' label='Name' name='name' value={this.state.commentState.get('name')} onChange={this.handleChange.bind(this, 'name')} />
        <Input type='email' label='Email' name='email' value={this.state.commentState.get('email')} onChange={this.handleChange.bind(this, 'email')} />
        <Input type='text' label='Country' name='country' value={this.state.commentState.get('country')} onChange={this.handleChange.bind(this, 'country')} />
        <Input type='number' label='Age' name='age' value={this.state.commentState.get('age')} onChange={this.handleChange.bind(this, 'age')} />
      </Dialog>
    )
  }
}

export default CommentForm;
