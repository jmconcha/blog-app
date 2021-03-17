import {
	LOADING_UI,
	DONE_LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
} from '../types';

const ui = (
	state = {
		loading: false,
		errors: {},
	},
	action
) => {
	switch (action.type) {
		case LOADING_UI:
			return {
				...state,
				loading: true,
			};
		case DONE_LOADING_UI:
			return {
				...state,
				loading: false,
			};
		case SET_ERRORS:
			return {
				...state,
				errors: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: {},
			};
		default:
			return state;
	}
};

export default ui;