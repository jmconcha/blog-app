import { db } from '../../util/firebase';
import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	ADD_BLOG,
	REMOVE_BLOG,
	SET_LIKES,
	SET_COMMENTS,
	ADD_COMMENT,
} from '../types';
import {
	setErrors,
	clearErrors,
	loadingUI,
	doneLoadingUI
} from './ui';

export const getBlogs = () => (dispatch) => {
	dispatch({
		type: LOADING_DATA,
	});
	db
		.collection('blogs')
		.get()
		.then((blogsSnaphot) => {
			const blogsData = [];
			blogsSnaphot.forEach((blog) => {
				blogsData.push({
					blogId: blog.id,
					...blog.data(),
				});
			});
			dispatch({
				type: DONE_LOADING_DATA,
			});
			dispatch({
				type: SET_BLOGS,
				payload: blogsData,
			});
		})
		.catch((err) => {
			console.error(err);
		})
};

export const postBlog =(body, username, imageUrl, successCallback) => (dispatch) => {
	if (body.trim() === '') {
		dispatch(setErrors({ body: 'Must not be empty' }));
	} else {
		dispatch(loadingUI());
		const newBlogData = {
			username,
			imageUrl,
			body,
			createdAt: new Date().toISOString(),
			likeCount: 0,
			commentCount: 0,
		};
		db
			.collection('blogs')
			.add(newBlogData)
			.then((blogSnaphot) => {
				dispatch(clearErrors());
				successCallback();
				dispatch(doneLoadingUI());
				dispatch({
					type: ADD_BLOG,
					payload: {
						blogId: blogSnaphot.id,
						...newBlogData,
					},
				});
			})
			.catch((err) => {
				console.error(err);
			})
	}
};

export const deleteBlog = (blogId) => (dispatch) => {
	db
		.doc(`/blogs/${blogId}`)
		.delete()
		.then(() => {
			dispatch({
				type: REMOVE_BLOG,
				payload: blogId,
			});
		})
		.catch((err) => {
			console.error(err);
		})
};

export const getComments = (blogId) => (dispatch) => {
	console.log(blogId);
	if (!blogId) {
		console.log('no blogId');
		return;
	};
	dispatch(loadingUI());
	// fetch blog comments
	db
		.collection('comments')
		.orderBy('createdAt', 'desc')
		.where('blogId', '==', blogId)
		.get()
		.then((commentsSnapshot) => {
			const commentsData = [];

			commentsSnapshot.forEach((comment) => {
				commentsData.push({
					commentId: comment.id,
					...comment.data(),
				});
			});

			dispatch({
				type: SET_COMMENTS,
				payload: commentsData,
			});
			dispatch(doneLoadingUI());
		})
		.catch((err) => {
			console.error(err);
		});
};

export const commentOnBlog = (
	comment,
	blogId,
	username,
	imageUrl
) => (dispatch) => {
	dispatch(loadingUI());
	if (comment.trim() === '') {
		dispatch(doneLoadingUI());
		dispatch(
			setErrors({ comment: 'Must no be empty' })
		);
	} else {
		const newCommentData = {
			comment,
			username,
			imageUrl,
			blogId,
			createdAt: new Date().toISOString(),
		};

		db
			.collection('/comments')
			.add(newCommentData)
			.then((commentSnapshot) => {
				newCommentData.commentId = commentSnapshot.id;
				dispatch(clearErrors());
				dispatch(doneLoadingUI());
				dispatch({
					type: ADD_COMMENT,
					payload: newCommentData,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}
};