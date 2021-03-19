import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComments, emptyComments } from '../../redux/actions/data';
import Comment from './Comment';
import CommentSkeleton from './CommentSkeleton';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	...theme.myCSS,
	noComment: {
		textAlign: 'center',
		width: '100%',
	},
});

const Comments = ({
	classes,
	blogId,
	getComments,
	emptyComments,
	comments,
}) => {
	useEffect(() => {
		getComments(blogId);
		return () => {
			emptyComments();
		};
	}, []);

	const commentsMarkup = comments === null ? (
		<CommentSkeleton />
	) : (
		comments.length === 0 ? (
			<Typography variant="h5" className={classes.noComment}>
				No  comments yet
			</Typography>
		) : (
			comments.map((comment, index) => (
				<Fragment  key={comment.commentId}>
					<Comment comment={comment} />
					{(index !== (comments.length - 1)) ? (
						<hr className={classes.visibleSeparator} />
					) : (null)}
				</Fragment>
			))
		)
	);

	return (
		<Grid container>
			{commentsMarkup}
		</Grid>
	);
};
Comments.propTypes = {
	classes: PropTypes.object.isRequired,
	blogId: PropTypes.string.isRequired,
	getComments: PropTypes.func.isRequired,
	comments: PropTypes.array,
};

const mapStateToProps = (state) => ({
	comments: state.data.comments,
});

export default connect(
	mapStateToProps,
	{ getComments, emptyComments }
)(withStyles(styles)(Comments));