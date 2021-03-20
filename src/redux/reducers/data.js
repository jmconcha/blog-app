import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	ADD_BLOG,
	SET_BLOG_IMAGE_URL,
	REMOVE_BLOG,
	SET_COMMENTS,
	ADD_COMMENT,
	EMPTY_COMMENTS,
	INCREMENT_LIKE,
	DECREMENT_LIKE,
	INCREMENT_COMMENT_COUNT,
} from '../types';

const data = (
	state = {
		loading: false,
		blogs: [],
		comments: null,
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
		case EMPTY_COMMENTS:
			return {
				...state,
				comments: null,
			};
		case ADD_COMMENT: 
			return {
				...state,
				comments: [
					...state.comments,
					action.payload,
				],
			};
		case INCREMENT_LIKE:
		case DECREMENT_LIKE:
			return {
				...state,
				blogs: state.blogs.map((blog) => {
					if (blog.blogId === action.payload) {
						const likeCount = action.type === 'INCREMENT_LIKE' ?
							(blog.likeCount + 1) :
							(blog.likeCount - 1);
						return {
							...blog,
							likeCount,
						};
					}
					return blog;
				}),
			};
		case INCREMENT_COMMENT_COUNT:
			return {
				...state,
				blogs: state.blogs.map((blog) => {
					if (blog.blogId === action.payload) {
						return {
							...blog,
							commentCount: blog.commentCount + 1,
						};
					}
					return blog;
				}),
			};
		default:
			return state;
	}
};

export default data;