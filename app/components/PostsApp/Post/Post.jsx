import React from 'react';
import PropTypes from 'prop-types';
import style from './style';
import Comments from './CommentsApp/Comments'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
const Post = ({ title, body, date }) => (
  <Card style={{width: '600px'}}>
    <CardTitle
      title={title}
      subtitle={date}
    />
    <CardText>{body}</CardText>
    <Card>
      <CardTitle
        title="Comentarios"
      />
        <CardText>
            <Comments />
        </CardText>
    </Card>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Post;
