import { combineReducers } from 'redux';
import userReducer from './user';
import dataReducer from './data';
import uiReducer from './ui';

const rootReducer = combineReducers({
	user: userReducer,
	data: dataReducer,
	ui: uiReducer,
});

export default rootReducer;