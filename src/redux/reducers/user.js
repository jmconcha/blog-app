import {
	LOADING_USER,
	DONE_LOADING_USER,
	USER_AUTHENTICATED,
	USER_NOT_AUTHENTICATED,
	SET_USER_CREDENTIALS,
	SET_USER_NOTIFICATIONS,
	SET_USER_LIKES,
} from '../types';

const user = (
	state = {
		loading: false,
		authenticated: false,
		credentials: {},
		notifications: [],
		likes: [],
	},
	action
) => {
	switch (action.type) {
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		case DONE_LOADING_USER:
			return {
				...state,
				loading: false,
			};
		case USER_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case USER_NOT_AUTHENTICATED:
			return {
				...state,
				loading: false,
				authenticated: false,
				credentials: null,
				notifications: [],
				likes: [],
			};
		case SET_USER_CREDENTIALS:
			return {
				...state,
				credentials: action.payload,
			};
		case SET_USER_NOTIFICATIONS:
			return {
				...state,
				notifications: action.payload,
			};
		case SET_USER_LIKES:
			return {
				...state,
				likes: action.payload,
			};
		default:
			return state;
	}
};

export default user;