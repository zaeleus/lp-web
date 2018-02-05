import { YearMonth, ZoneId } from "js-joda";
import * as React from "react";
import { connect } from "react-redux";
import { routeNodeSelector, RouterState } from "redux-router5";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Artist from "./pages/Artist";
import ArtistMemberships from "./pages/ArtistMemberships";
import Calendar from "./pages/Calendar";
import EditArtist from "./pages/EditArtist";
import Home from "./pages/Home";
import NewArtist from "./pages/NewArtist";
import NewRelease from "./pages/NewRelease";
import Release from "./pages/Release";
import Search from "./pages/Search";
import Song from "./pages/Song";

type Props = RouterState;

class App extends React.Component<Props, {}> {
    public render() {
        const { route } = this.props;

        if (!route) {
            return <p>Routing failed</p>;
        }

        const params = route.params as any;

        let content;

        switch (route.name) {
            case "home":
                content = <Home />;
                break;
            case "artist":
                content = <Artist id={params.id} />;
                break;
            case "artists-edit":
                content = <EditArtist id={params.id} />;
                break;
            case "artists-memberships":
                content = <ArtistMemberships id={params.id} />;
                break;
            case "artists-new":
                content = <NewArtist />;
                break;
            case "release":
                content = <Release id={params.id} />;
                break;
            case "release-new":
                content = <NewRelease />;
                break;
            case "song":
                content = <Song id={params.id} />;
                break;
            case "calendar":
                const date = params.date || YearMonth.now(ZoneId.UTC).toString();
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

export default connect(routeNodeSelector(""))(App);
