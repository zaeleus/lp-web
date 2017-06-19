import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";

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
    artist?: IArtist;
    loading: boolean;
}

type IProps = IComponentProps & IDataProps;

const ShowArtist: React.StatelessComponent<IProps> = ({ artist, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!artist) {
        return <h2>Not found</h2>;
    }

    let memberships;

    if (artist.kind === "GROUP") {
        const members = (artist.memberships.length === 0)
            ? <Alert>No members.</Alert>
            : <Memberships memberships={artist.memberships} />;

        memberships = (
            <div>
                <h3>Members</h3>
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

const withData = graphql<IDataProps, IComponentProps>(FindArtist, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            artist: data.artist,
            loading: data.loading,
        };
    },
});

export default withData(ShowArtist);
