import firebase, { db } from '../../util/firebase';
import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	ADD_BLOG,
	REMOVE_BLOG,
	SET_LIKES,
	SET_COMMENTS,
	ADD_COMMENT,
	EMPTY_COMMENTS,
	INCREMENT_LIKE,
	DECREMENT_LIKE,
	ADD_USER_LIKE,
} from '../types';
import {
	setErrors,
	clearErrors,
	loadingUI,
	doneLoadingUI
} from './ui';
import {
	addUserLike,
	removeUserLike,
} from './user';

export const getBlogs = () => (dispatch) => {
	dispatch({
		type: LOADING_DATA,
	});
	db
		.collection('blogs')
		.orderBy('createdAt', 'desc')
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

export const emptyComments = () => (dispatch) => {
	dispatch({
		type: EMPTY_COMMENTS,
	});
};

export const incrementLike = (blogId) => (dispatch) => {
	dispatch({
		type: INCREMENT_LIKE,
		payload: blogId,
	});
};

export const decrementLike = (blogId) => (dispatch) => {
	dispatch({
		type: DECREMENT_LIKE,
		payload: blogId,
	});
};

export const likeBlog = (blogId, sender, recipient) => (dispatch) => {
	const newLikeData = {
		blogId,
		username: sender,
		createdAt: new Date().toISOString(),
	};

	// like blog
	db
		.collection('likes')
		.add(newLikeData)
		.then((likeSnapshot) => {
			newLikeData.likeId = likeSnapshot.id;
			dispatch(
				addUserLike(newLikeData)
			);

			dispatch(incrementBlogLikeCount(blogId));

			// add notification
			if (sender !== recipient) {
				const newNotificationData = {
					sender,
					recipient,
					blogId,
					type: 'like',
					read: 'false',
					createdAt: new Date().toISOString(),
				};

				db
					.collection('notifications')
					.doc(newLikeData.likeId)
					.set(newNotificationData)
					.catch((err) => {
						console.error(err);
					});
			}
		})
		.catch((err) => {
			console.error(err);
		});
};

export const incrementBlogLikeCount = (blogId) => (dispatch) => {
	db
		.doc(`/blogs/${blogId}`)
		.update({
			likeCount: firebase.firestore.FieldValue.increment(1),
		})
		.then(() => {
			dispatch({
				type: INCREMENT_LIKE,
				payload: blogId,
			})
		})
		.catch((err) => {
			console.error(err);
		});
};

// unlikes a blog
export const unlikeBlog = (blogId, likeId) => (dispatch) => {
	db
		.doc(`/likes/${likeId}`)
		.delete()
		.then(() => {
			dispatch(
				removeUserLike(likeId)
			);

			dispatch(
				decrementBlogLikeCount(blogId)
			);

			// remove notification
			db
				.doc(`/notifications/${likeId}`)
				.delete();
		})
		.catch((err) => {
			console.error(err);
		});
};

export const decrementBlogLikeCount = (blogId) => (dispatch) => {
	db
		.doc(`/blogs/${blogId}`)
		.update({
			likeCount: firebase.firestore.FieldValue.increment(-1),
		})
		.then(() => {
			dispatch({
				type: DECREMENT_LIKE,
				payload: blogId,
			});
		})
		.catch((err) => {
			console.error(err);
		});
};