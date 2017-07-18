import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";

import RecentAlbums from "../components/RecentAlbums";
import { IAlbum } from "../models/Album";

interface IProps {
    loading: boolean;
    recentAlbums?: IAlbum[];
    data?: any;
    mutate?: any;
}

const Home: React.StatelessComponent<IProps> = ({ recentAlbums, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!recentAlbums) {
        return <h2>Not found</h2>;
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

const withData = graphql<IProps>(GetRecentAlbums, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            loading: data.loading,
            recentAlbums: data.recentAlbums,
        };
    },
});

export default withData(Home);
