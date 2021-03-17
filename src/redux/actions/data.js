import { db } from '../../util/firebase';
import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	SET_BLOG,
} from '../types';

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