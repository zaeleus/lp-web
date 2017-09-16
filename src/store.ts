import ApolloClient from "apollo-client";
import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from "redux";
import { router5Middleware, router5Reducer } from "redux-router5";
import * as Router5 from "router5";

import artistFormReducer from "./reducers/artist-form";
import artistMembershipsFormReducer from "./reducers/artist-memberships-form";

const preloadedState = {};

// FIXME any to ?
const configureStore = (router: Router5.Router, client: ApolloClient): Store<any> => {
    const reducers = combineReducers({
        apollo: client.reducer() as Reducer<any>,
        artistForm: artistFormReducer,
        artistMembershipsForm: artistMembershipsFormReducer,
        router: router5Reducer,
    });

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(applyMiddleware(
        router5Middleware(router),
        client.middleware(),
    ));

    return createStore(reducers, preloadedState, enhancers);
};

export default configureStore;
