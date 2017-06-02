import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Contributions from "../components/Song/Contributions";
import Header from "../components/Song/Header";
import Urls from "../components/Song/Urls";
import { ISong } from "../models/Song";

interface IComponentProps {
    id: string;
}

interface IDataProps {
    song: ISong;
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const ShowSong: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const song = data.song;

    let contributions;
    let urls;

    if (song.urls.length === 0) {
        urls = <div className="alert">No external links.</div>;
    } else {
        urls = <Urls urls={song.urls} />;
    }

    if (song.contributions.length === 0) {
        contributions = <div className="alert">No contributions.</div>
    } else {
        contributions = <Contributions contributions={song.contributions} />;
    }

    return (
        <div id="content">
            <div className="full">
                <Header song={song} />

                <h3>External Links</h3>
                {urls}

                <h3>Contributions</h3>
                {contributions}
            </div>
        </div>
    );
};

const FindSong = gql`
    query FindSong($id: ID!) {
        song(id: $id) {
            id

            names {
                id
                name
                isDefault
                isOriginal
            }

            contributions {
                kind
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
            }

            urls {
                id
                url
                name
            }
        }
    }
`;

export default graphql(FindSong)(ShowSong);
