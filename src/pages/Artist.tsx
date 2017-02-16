import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Albums from "../components/Artist/Albums";
import Memberships from "../components/Artist/Memberships";
import { IArtist } from "../models/Artist";
import * as Nameable from "../models/Nameable";

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

    return (
        <div>
            <header className="page">
                <h2>Artist {Nameable.defaultName(artist.names)}</h2>
            </header>

            <div id="content">
                <div className="secondary">
                    <dl>
                        <dt>Country</dt>
                        <dd>{artist.country}</dd>
                    </dl>

                    <h3>Memberships</h3>

                    <Memberships memberships={artist.memberships} />
                </div>

                <div className="primary">
                    <h3>Albums</h3>
                    <Albums albums={artist.albums} />
                </div>
            </div>
        </div>
    );
};

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            country
            names {
                name
                isDefault
                isOriginal
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
            }
        }
    }
`;

export default graphql(FindArtist)(ShowArtist);
