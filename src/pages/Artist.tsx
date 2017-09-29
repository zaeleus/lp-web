import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import Alert from "../components/Alert";
import Albums from "../components/Artist/Albums";
import Groupships from "../components/Artist/Groupships";
import Header from "../components/Artist/Header";
import Memberships from "../components/Artist/Memberships";
import Meta from "../components/Artist/Meta";
import Urls from "../components/Artist/Urls";
import Link from "../components/Link";
import { IArtist } from "../models/Artist";

interface IInputProps {
    id: string;
}

interface IResult {
    artist: IArtist;
}

type WrappedProps = IResult & QueryProps;
type Props = IInputProps & WrappedProps;

const ShowArtist: React.StatelessComponent<Props> = ({ error, artist, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error loading artist</h2>;
    }

    let memberships;

    if (artist.kind === "GROUP") {
        const members = (artist.memberships.length === 0)
            ? <Alert>No members.</Alert>
            : <Memberships memberships={artist.memberships} />;

        memberships = (
            <div>
                <h3>Members</h3>
                <Link to="artists-memberships" params={{ id: artist.id }}>[edit]</Link>
                {members}
            </div>
        );
    } else {
        const groups = (artist.groupships.length === 0)
            ? <Alert>No groups.</Alert>
            : <Groupships groupships={artist.groupships} />;

        memberships = (
            <div>
                <h3>Groups</h3>
                {groups}
            </div>
        );
    }

    const albums = (artist.albums.length === 0)
        ? <Alert>No albums.</Alert>
        : <Albums albums={artist.albums} />;

    const urls = (artist.urls.length === 0)
        ? <Alert>No external links.</Alert>
        : <Urls urls={artist.urls} />;

    return (
        <div id="content">
            <div className="full">
                <Header artist={artist} />

                <div id="content">
                    <div className="secondary">
                        <Link to="artists-edit" params={{ id: artist.id }}>[edit]</Link>

                        <Meta artist={artist} />
                        {memberships}

                        <h3>External Links</h3>
                        {urls}
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
            startedOn
            endedOn
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
                    country
                    releasedOn
                    artworkUrls {
                        thumbnail
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

export default graphql<IResult, IInputProps, WrappedProps>(FindArtist, {
    props: ({ data }) => ({ ...data }),
})(ShowArtist);
