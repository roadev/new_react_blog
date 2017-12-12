import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Posts from './Posts';
import {
   fetchPosts,
   updatePost,
   deletePost,
   createPost
} from '../../actions';

const mapStateToProps = (state) => ({
  postsData: state.postsData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchPosts, updatePost, deletePost, createPost
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
