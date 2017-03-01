import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import RecentAlbums from "../components/RecentAlbums";
import { IAlbum } from "../models/Album";

interface IDataProps {
    recentAlbums: IAlbum[];
}

type IProps = InjectedGraphQLProps<IDataProps>;

const Home: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const albums = data.recentAlbums;

    return (
        <div>
            <h2>Hello, LP</h2>

            <h3>Recent Albums</h3>
            <RecentAlbums albums={albums} />
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
                releasedOn
            }
        }
    }
`;

export default graphql(GetRecentAlbums)(Home);
