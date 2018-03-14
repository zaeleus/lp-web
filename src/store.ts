import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import { router5Middleware, router5Reducer } from "redux-router5";
import * as Router5 from "router5";

import artistMembershipsFormReducer from "./reducers/artist-memberships-form";

const preloadedState = {};

// FIXME any to ?
const configureStore = (router: Router5.Router): Store<any> => {
    const reducers = combineReducers({
        artistMembershipsForm: artistMembershipsFormReducer,
        router: router5Reducer,
    });

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(applyMiddleware(
        router5Middleware(router),
    ));

    return createStore(reducers, preloadedState, enhancers);
};

export default configureStore;
