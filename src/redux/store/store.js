import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];

const store = createStore(
	rootReducer,{},
	// compose(
		applyMiddleware(...middlewares)
	// 	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// )
);

export default store;