import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	SET_BLOG,
	ADD_BLOG,
	SET_BLOG_IMAGE_URL,
	REMOVE_BLOG,
} from '../types';

const data = (
	state = {
		loading: false,
		blogs: [],
		blog: null,
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
		case SET_BLOG:
			return {
				...state,
				blog: action.payload,
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
		default:
			return state;
	}
};

export default data;