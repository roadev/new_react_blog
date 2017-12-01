import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

class CommentForm extends Component {
  static propTypes = {
    createComment: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    email: '',
    country: '',
    age: 0,
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };


  handleCreateComment = () => {
    const { createComment } =  this.props;
    createComment(this.state);
  }

  render() {
    const { name, email, country, age} = this.state;
    return (
      <div>
        <Input type='text' label='Name' name='name' value={name} onChange={this.handleChange.bind(this, 'name')} />
        <Input type='email' label='Email' name='email' value={email} onChange={this.handleChange.bind(this, 'email')} />
        <Input type='text' label='Country' name='country' value={country} onChange={this.handleChange.bind(this, 'country')} />
        <Input type='number' label='Age' name='age' value={age} onChange={this.handleChange.bind(this, 'age')} />
        <Button
          icon="add"
          label="Create comment"
          onClick={this.handleCreateComment}
        />
      </div>
    )
  }
}

export default CommentForm;
