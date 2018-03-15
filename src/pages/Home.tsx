import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Loading from "../components/Loading";
import RecentAlbums from "../components/RecentAlbums";
import GetRecentAlbums, { IRecentAlbums } from "../queries/GetRecentAlbums";

type Props = DataValue<IRecentAlbums>;

const Home: React.StatelessComponent<Props> = ({ error, recentAlbums, loading }) => {
    if (loading) {
        return <Loading />;
    }

    if (error || !recentAlbums) {
        return <h2>Error loading home page</h2>;
    }

    return (
        <div id="content">
            <div className="full">
                <h2>Hello, LP</h2>

                <h3>Recent Albums</h3>
                <RecentAlbums albums={recentAlbums} />
            </div>
        </div>
    );
};

export default graphql(GetRecentAlbums, {
    props: ({ data }) => ({ ...data }),
})(Home);
