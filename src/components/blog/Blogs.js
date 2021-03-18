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
}) => {
	useEffect(() => {
		getBlogs();
	}, []);

	const blogsMarkup = loading ? (
		<BlogSkeleton />
	) : (
		blogs.map((blog) => (
			<Blog key={blog.blogId} blog={blog} />
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
};

const mapStateToProps = (state) => ({
	loading: state.data.loading,
	blogs: state.data.blogs,
});

export default connect(
	mapStateToProps,
	{ getBlogs }
)(Blogs);