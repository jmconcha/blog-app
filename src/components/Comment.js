import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentOnBlog } from '../redux/actions/data';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	...theme.myCSS,
  submitButton: {
  	marginBottom: 6,
  	float: 'right',
  },
});

const Comment = ({
	classes,
	commentOnBlog,
	loading,
	errors,
	blogId,
}) => {
	const [comment, setComment] = useState('');

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		commentOnBlog(comment, blogId);
		setComment('');
	};

	return (
		<Grid item sm>
			<form onSubmit={handleSubmit}>
      	<TextField
          name="comment"
          type="text"
          label="Comment"
          multiline
          rows="2"
          error={Boolean(errors.comment)}
          helperText={errors.comment}
          value={comment}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
        	type="submit"
        	variant="contained"
        	color="primary"
        	disabled={loading}
        	className={classes.submitButton}
        >
        	Submit
        	{loading && (
						<CircularProgress size={30} className={classes.progress} />
					)}
        </Button>
      </form>
		</Grid>
	);
};
Comment.propTypes = {
	classes: PropTypes.object.isRequired,
	commentOnBlog: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
	blogId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	blogId: ownProps.blogId,
	loading: state.ui.loading,
	errors: state.ui.errors,
	username: state.user.credentials.username,
	imageUrl: state.user.credentials.imageUrl,
});

const mergeProps = (stateProps, actionProps) => ({
	blogId: stateProps.blogId,
	loading: stateProps.loading,
	errors: stateProps.errors,
	commentOnBlog: (comment, blogId) => {
		actionProps.commentOnBlog(
			comment,
			blogId,
			stateProps.username,
			stateProps.imageUrl,
		);
	},
});

export default connect(
	mapStateToProps,
	{ commentOnBlog },
	mergeProps
)(withStyles(styles)(Comment));