import { db } from '../../util/firebase';
import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	SET_BLOG,
	ADD_BLOG,
	REMOVE_BLOG,
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
			console.log('deleted', blogId);
			dispatch({
				type: REMOVE_BLOG,
				payload: blogId,
			});
		})
		.catch((err) => {
			console.error(err);
		})
};