import {
	LOADING_USER,
	DONE_LOADING_USER,
	USER_AUTHENTICATED,
	USER_NOT_AUTHENTICATED,
	SET_USER_LIKES,
	SET_USER_IMAGE_URL,
	SET_USER_DETAILS,
	ADD_USER_LIKE,
	SET_USER_CREDENTIALS,
	SET_USER_NOTIFICATIONS,
	REMOVE_USER_LIKE,
	MARK_NOTIFICATIONS_READ,
	REMOVE_NOTIFICATIONS,
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
				credentials: {},
				notifications: [],
				likes: [],
			};
		case SET_USER_CREDENTIALS:
			return {
				...state,
				credentials: action.payload,
			};
		case SET_USER_LIKES:
			return {
				...state,
				likes: action.payload,
			};
		case SET_USER_IMAGE_URL:
			return {
				...state,
				credentials: {
					...state.credentials,
					imageUrl: action.payload,
				},
			};
		case SET_USER_DETAILS:
			return {
				...state,
				credentials: {
					...state.credentials,
					...action.payload,
				}
			};
		case ADD_USER_LIKE: 
			return {
				...state,
				likes: [
					...state.likes,
					action.payload,
				],
			};
		case SET_USER_NOTIFICATIONS: 
			return {
				...state,
				notifications: action.payload,
			};
		case REMOVE_USER_LIKE:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.likeId !== action.payload
				),
			};
		case MARK_NOTIFICATIONS_READ:
			return {
				...state,
				notifications: state.notifications.map((notif) => {
					const isUnread = action.payload.some(
						(unreadNotifId) => unreadNotifId === notif.notificationId
					);

					if (isUnread) {
						return {
							...notif,
							read: true,
						};
					}
					return notif;
				}),
			};
		case REMOVE_NOTIFICATIONS:
			return {
				...state,
				notifications: state.notifications.filter(
					(notif) => !(action.payload.includes(notif.notificationId))
				),
			};
		default:
			return state;
	}
};

export default user;