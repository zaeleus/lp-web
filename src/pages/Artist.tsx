import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Alert from "../components/Alert";
import Albums from "../components/Artist/Albums";
import Groupships from "../components/Artist/Groupships";
import Header from "../components/Artist/Header";
import Memberships from "../components/Artist/Memberships";
import { IArtist } from "../models/Artist";

interface IComponentProps {
    id: string;
}

interface IDataProps {
    artist: IArtist;
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const ShowArtist: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const artist = data.artist;

    let albums;
    let memberships;

    if (artist.kind === "GROUP") {
        memberships = (
            <div>
                <h3>Members</h3>
                <Memberships memberships={artist.memberships} />
            </div>
        );
    } else {
        memberships = (
            <div>
                <h3>Groups</h3>
                <Groupships groupships={artist.groupships} />
            </div>
        );
    }

    if (artist.albums.length === 0) {
        albums = <Alert>No albums.</Alert>;
    } else {
        albums = <Albums albums={artist.albums} />;
    }

    return (
        <div id="content">
            <div className="full">
                <Header artist={artist} />

                <div id="content">
                    <div className="secondary">
                        <dl>
                            <dt>Country</dt>
                            <dd>{artist.country}</dd>
                        </dl>

                        {memberships}
                    </div>

                    <div className="primary">
                        <h3>Albums</h3>
                        {albums}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            kind
            country
            names {
                name
                isDefault
                isOriginal
            }
            groupships {
                group {
                    id
                    names {
                        name
                        isDefault
                        isOriginal
                    }
                }
            }
            memberships {
                artistCredit {
                    names {
                        name
                        isDefault
                        isOriginal
                        artist {
                            id
                        }
                    }
                }
            }
            albums {
                id
                names {
                    name
                    isDefault
                    isOriginal
                }
                defaultRelease {
                    id
                    releasedOn
                }
            }
        }
    }
`;

export default graphql(FindArtist)(ShowArtist);
