import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComments, emptyComments } from '../../redux/actions/data';
import Comment from './Comment';
// MUI Components
import Grid from '@material-ui/core/Grid';

const Comments = ({
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
		<h2>loading</h2>
	) : (
		comments.map((comment) => (
			<Comment key={comment.commentId} comment={comment} />
		))
	);

	return (
		<Grid container>
			{commentsMarkup}
		</Grid>
	);
};
Comments.propTypes = {
	blogId: PropTypes.string.isRequired,
	getComments: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	comments: state.data.comments,
});

export default connect(
	mapStateToProps,
	{ getComments, emptyComments }
)(Comments);