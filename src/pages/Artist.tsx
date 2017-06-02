import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Alert from "../components/Alert";
import Albums from "../components/Artist/Albums";
import Groupships from "../components/Artist/Groupships";
import Header from "../components/Artist/Header";
import Memberships from "../components/Artist/Memberships";
import Meta from "../components/Artist/Meta";
import Urls from "../components/Artist/Urls";
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

    let memberships;

    if (artist.kind === "GROUP") {
        const members = (artist.memberships.length === 0)
            ? <div className="alert">No members.</div>
            : <Memberships memberships={artist.memberships} />;

        memberships = (
            <div>
                <h3>Members</h3>
                {members}
            </div>
        );
    } else {
        const groups = (artist.groupships.length === 0)
            ? <div className="alert">No groups.</div>
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

export default graphql(FindArtist)(ShowArtist);
