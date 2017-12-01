import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';
import Comments from '../../CommentsApp/Comments'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

class Post extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }
  state = {
    hideComments: true,
    buttonText: "Mostrar comentarios"
  }
  handleToggleComments = () => {
    if(this.state.hideComments){
      this.setState({hideComments:false, buttonText:"Ocultar comentarios"});
    }else{
      this.setState({hideComments:true, buttonText:"Mostrar comentarios"});
    }
  }
  render(){
    const { title, date, body } = this.props;
    return(
      <Card style={{width: '600px'}}>
        <CardTitle
          title={title}
          subtitle={date}
        />
        <CardText>{body}</CardText>
        <Button
          icon="show"
          label={this.state.buttonText}
          onClick={this.handleToggleComments}
        />
        <div hidden={this.state.hideComments}>
          <Card>
            <CardTitle
              title="Comentarios"
            />
              <CardText >
                  <Comments />
              </CardText>
          </Card>
        </div>
      </Card>
    )
  }
}
export default Post;
