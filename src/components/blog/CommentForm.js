import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentOnBlog } from '../../redux/actions/data';
import { clearErrors } from '../../redux/actions/ui';
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
	authenticated,
	commentOnBlog,
	clearErrors,
	loading,
	errors,
}) => {
	useEffect(() => {
		return () => {
			clearErrors();
		};
	}, []);

	const [comment, setComment] = useState('');

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		commentOnBlog(comment);
		setComment('');
	};

	return (
		authenticated ? (
			<Fragment>
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
				<hr className={classes.visibleSeparator} />
			</Fragment>
		) : (null)
	);
};
Comment.propTypes = {
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	commentOnBlog: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	blogId: ownProps.blogId,
	blogUsername: ownProps.blogUsername,
	authenticated: state.user.authenticated,
	loading: state.ui.loading,
	errors: state.ui.errors,
	authenticatedUser: state.user.credentials.username,
	imageUrl: state.user.credentials.imageUrl,
});

const mergeProps = (stateProps, actionProps) => ({
	authenticated: stateProps.authenticated,
	blogId: stateProps.blogId,
	loading: stateProps.loading,
	errors: stateProps.errors,
	clearErrors: actionProps.clearErrors,
	commentOnBlog: (comment) => {
		actionProps.commentOnBlog(
			comment,
			stateProps.blogId,
			stateProps.blogUsername,
			stateProps.authenticatedUser,
			stateProps.imageUrl,
		);
	},
});

export default connect(
	mapStateToProps,
	{ clearErrors, commentOnBlog },
	mergeProps
)(withStyles(styles)(Comment));