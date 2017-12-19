import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { RouterProvider } from "react-router5";
import createRouter from "router5";
// tslint:disable-next-line:no-submodule-imports
import browserPlugin from "router5/plugins/browser";

import App from "./App";
import routes from "./routes";
import configureStore from "./store";

// tslint:disable-next-line:no-submodule-imports
import "normalize.css/normalize.css";
import "./index.css";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "/graphql" }),
});
const router = createRouter(routes).usePlugin(browserPlugin());
const store = configureStore(router);

const WrappedApp = (
    <ReduxProvider store={store}>
        <ApolloProvider client={client}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </ApolloProvider>
    </ReduxProvider>
);

router.start(() => render(WrappedApp, document.getElementById("root")));
