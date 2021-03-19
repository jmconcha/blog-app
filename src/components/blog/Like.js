import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  likeBlog,
  unlikeBlog,
} from '../../redux/actions/data';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// MUI Icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  span: {
    fontSize: '0.9rem',
  },
});

const Like = ({
	authenticatedUser,
	likes,
	likeBlog,
	unlikeBlog,
	blog: {
		blogId,
		username,
		likeCount,
	},
}) => {
	const classes = useStyles();

  const isLiked = () => {
    return likes.some((like) => like.blogId === blogId);
  };

  const getLikeId = () => {
    const like = likes.find((like) => like.blogId === blogId);
    return like.likeId;
  };

  const handleLikeClick = () => {
    if (authenticatedUser) {
      likeBlog(blogId, authenticatedUser, username); 
    }
  };

  const handleUnlikeClick = () => {
    if (authenticatedUser) {
      unlikeBlog(blogId, getLikeId()); 
    }
  };

  const likeMarkup = isLiked() ? (
    <IconButton aria-label="unlike" onClick={handleUnlikeClick}>
      <FavoriteIcon color='secondary' />
    </IconButton>
  ) : (
    <IconButton aria-label="like" onClick={handleLikeClick}>
      <FavoriteBorderIcon color='primary' />
    </IconButton>
  );

  const likeCountMarkup = likeCount === 0 ? (
    null
  ) : (
    <span className={classes.span}>
      {`${likeCount} ${
        likeCount > 1 ? 'likes' : 'like'
      }`}
    </span>
  );

	return (
		<Fragment>
			{likeMarkup}
			{likeCountMarkup}
		</Fragment>
	);
};
Like.propTypes = {
	authenticatedUser: PropTypes.string,
	likes: PropTypes.array.isRequired,
	blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  unlikeBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	authenticatedUser: state.user.credentials.username,
	likes: state.user.likes,
	blog: state.data.blogs.find(
		(blog) => blog.blogId === ownProps.blogId
	),
});

export default connect(
	mapStateToProps,
	{ likeBlog, unlikeBlog }
)(Like);