import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	ADD_BLOG,
	SET_BLOG_IMAGE_URL,
	REMOVE_BLOG,
	SET_COMMENTS,
	ADD_COMMENT,
} from '../types';

const data = (
	state = {
		loading: false,
		blogs: [],
		comments: [],
	},
	action
) => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case DONE_LOADING_DATA:
			return {
				...state,
				loading: false,
			};
		case SET_BLOGS:
			return {
				...state,
				blogs: action.payload,
			};
		case SET_BLOG_IMAGE_URL:
			return {
				...state,
				blogs: state.blogs.map((blog) => {
					if (blog.username === action.payload.username) {
						return {
							...blog,
							imageUrl: action.payload.imageUrl,
						};
					}
					return blog;
				}),
			};
		case ADD_BLOG:
			return {
				...state,
				blogs: [
					action.payload,
					...state.blogs,
				],
			};
		case REMOVE_BLOG:
			return {
				...state,
				blogs: state.blogs.filter(
					(blog) => blog.blogId !== action.payload
				),
			};
		case SET_COMMENTS:
			return {
				...state,
				comments: action.payload,
			};
		case ADD_COMMENT: 
			return {
				...state,
				comments: [
					...state.comments,
					action.payload,
				],
			};
		default:
			return state;
	}
};

export default data;