import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import ArtistCredit from "../components/ArtistCredit";
import Media from "../components/Media";
import Name from "../components/Name";
import Urls from "../components/Release/Urls";
import { IRelease } from "../models/Release";

import "./Release.css";

interface IComponentProps {
    id: string;
}

interface IDataProps {
    release: IRelease;
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const ShowRelease: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const release = data.release;

    const catalogNumber = release.catalogNumber ? release.catalogNumber : "—";

    return (
        <div id="content">
            <div className="full">
                <img className="artwork" src={release.artworkUrl} />

                <h2>
                    <div><Name names={release.album.names} /></div>
                    <div><Name names={release.album.names} original={true} /></div>
                </h2>

                <div><ArtistCredit artistCredit={release.album.artistCredit} /></div>
                <div><ArtistCredit artistCredit={release.album.artistCredit} original={true} /></div>

                <dt>Release Date</dt>
                <dd>[{release.country}] {release.releasedOn}</dd>

                <dt>Catalog Number</dt>
                <dd>{catalogNumber}</dd>

                <h3>Tracklist</h3>
                <Media media={release.media} />

                <h3>External Links</h3>
                <Urls urls={release.urls} />
            </div>
        </div>
    );
};

const FindRelease = gql`
    query FindRelease($id: ID!) {
        release(id: $id) {
            id
            releasedOn
            country
            catalogNumber
            artworkUrl
            album {
                id
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
                names {
                    id
                    name
                    isDefault
                    isOriginal
                }
            }
            urls {
                name
                url
            }
            media {
                id
                position
                kind
                tracks {
                    id
                    position
                    duration
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
                    names {
                        id
                        name
                        isDefault
                        isOriginal
                    }
                }
            }
        }
    }
`;

export default graphql(FindRelease)(ShowRelease);
