import ApolloClient from "apollo-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";

import { RouterProvider } from "react-router5";
import createRouter from "router5";
import browserPlugin from "router5/plugins/browser";

import App from "./App";
import configureStore from "./store";

import "normalize.css/normalize.css";
import "./index.css";

const routes = [
     { name: "home", path: "/" },
     { name: "artist", path: "/artists/:id" },
     { name: "calendar", path: "/calendar?date" },
     { name: "search", path: "/search?query" },
];

const router = createRouter(routes).usePlugin(browserPlugin());
const client = new ApolloClient();
const store = configureStore(router, client);

router.start(() => {
    ReactDOM.render(
        <ApolloProvider client={client} store={store}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </ApolloProvider>,
        document.getElementById("root") as HTMLElement,
    );
});
