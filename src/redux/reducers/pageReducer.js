import { IS_LOADING, IS_LOADED, SHOW_ERROR, CLEAR_ERROR } from "../types";

const initState = {
	isLoading: false,
	error: null,
};

const pageReducer = (state = initState, action) => {
	switch (action.type) {
		case IS_LOADING:
			return {
				...state,
				isLoading: true
			};

		case IS_LOADED:
			return {
				...state,
				isLoading: false
			};

		case SHOW_ERROR:
			return {
				...state,
				error: action.payload
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
};

export default pageReducer;