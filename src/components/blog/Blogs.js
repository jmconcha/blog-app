import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../redux/actions/data';
import Blog from './Blog';
import BlogSkeleton from './BlogSkeleton';

const Blogs = ({
	loading,
	blogs,
	getBlogs,
	userId,
	blogId,
}) => {
	useEffect(() => {
		getBlogs(userId);
	}, []);

	const blogsMarkup = loading ? (
		<BlogSkeleton />
	) : (
		blogs.map((blog) => (
			<Blog
				key={blog.blogId}
				blog={blog}
				dialogOpen={blog.blogId === blogId}
			/>
		))
	);

	return (
		blogsMarkup
	);
};
Blogs.propTypes = {
	loading: PropTypes.bool.isRequired,
	blogs: PropTypes.array.isRequired,
	getBlogs: PropTypes.func.isRequired,
	userId: PropTypes.string,
	blogId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	loading: state.data.loading,
	blogs: state.data.blogs,
	...ownProps,
});

export default connect(
	mapStateToProps,
	{ getBlogs }
)(Blogs);