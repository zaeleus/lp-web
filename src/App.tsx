import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { routeNodeSelector } from "redux-router5";
import { State } from "router5";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Artist from "./pages/Artist";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Release from "./pages/Release";
import Search from "./pages/Search";

interface IProps {
    route: State;
}

class App extends React.Component<IProps, {}> {
    public render() {
        const { route } = this.props;
        const params = route.params as any;

        let content;

        switch (route.name) {
            case "home":
                content = <Home />;
                break;
            case "artist":
                content = <Artist id={params.id} />;
                break;
            case "release":
                content = <Release id={params.id} />;
                break;
            case "calendar":
                const date = params.date || moment.utc().format("YYYY-MM");
                content = <Calendar date={date} />;
                break;
            case "search":
                content = <Search query={params.query} />;
                break;
            default:
                content = <p>Page not found.</p>;
                break;
        }

        return (
            <div>
                <Header />
                {content}
                <Footer />
            </div>
        );
    }
}

export default connect(() => routeNodeSelector(""))(App);
