import {
	LOADING_UI,
	DONE_LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
} from '../types';

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

export const setErrors = (errors) => (dispatch) => {
	dispatch({
		type: SET_ERRORS,
		payload: errors,
	});
};

export const loadingUI = () => (dispatch) => {
	dispatch({
		type: LOADING_UI,
	});
};

export const doneLoadingUI = () => (dispatch) => {
	dispatch({
		type: DONE_LOADING_UI,
	});
};