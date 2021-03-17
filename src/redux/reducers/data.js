import {
	LOADING_DATA,
	DONE_LOADING_DATA,
	SET_BLOGS,
	SET_BLOG,
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
		default:
			return state;
	}
};

export default data;