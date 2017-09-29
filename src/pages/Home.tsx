import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import RecentAlbums from "../components/RecentAlbums";
import { IAlbum } from "../models/Album";

interface IResult {
    recentAlbums: IAlbum[];
}

type Props = IResult & QueryProps;

const Home: React.StatelessComponent<Props> = ({ error, recentAlbums, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
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

const GetRecentAlbums = gql`
    {
        recentAlbums {
            id
            names {
                id
                name
                isDefault
                isOriginal
            }
            artistCredit {
                id
                names {
                    id
                    position
                    name
                    locale
                    isDefault
                    isOriginal
                    separator
                    artist {
                        id
                    }
                }
            }
            defaultRelease {
                id
                country
                releasedOn
                artworkUrls {
                    thumbnail
                }
            }
        }
    }
`;

export default graphql<IResult, {}, Props>(GetRecentAlbums, {
    props: ({ data }) => ({ ...data }),
})(Home);
