import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import Alert from "../components/Alert";
import Contributions from "../components/Song/Contributions";
import Header from "../components/Song/Header";
import Releases from "../components/Song/Releases";
import Urls from "../components/Song/Urls";
import { ISong } from "../models/Song";

interface IInputProps {
    id: string;
}

interface IResult {
    song: ISong;
}

type WrappedProps = IResult & QueryProps;
type Props = IInputProps & WrappedProps;

const ShowSong: React.StatelessComponent<Props> = ({ error, loading, song }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error loading song</h2>;
    }

    const contributions = (song.contributions.length === 0)
        ? <Alert>No contributions.</Alert>
        : <Contributions contributions={song.contributions} />;

    const releases = (song.appearsOn.length === 0)
        ? <Alert>No appearances.</Alert>
        : <Releases releases={song.appearsOn} />;

    const urls = (song.urls.length === 0)
        ? <Alert>No external links.</Alert>
        : <Urls urls={song.urls} />;

    return (
        <div id="content">
            <div className="full">
                <Header song={song} />

                <h3>Appears On</h3>
                {releases}

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

            appearsOn {
                id
                album {
                    id
                    names {
                        id
                        name
                        isDefault
                        isOriginal
                    }
                }
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

export default graphql<IResult, IInputProps, WrappedProps>(FindSong, {
    props: ({ data }) => ({ ...data }),
})(ShowSong);
