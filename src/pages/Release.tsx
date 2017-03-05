import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import ArtistCredit from "../components/ArtistCredit";
import Media from "../components/Media";
import Name from "../components/Name";
import Urls from "../components/Release/Urls";
import { IRelease } from "../models/Release";

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

    return (
        <div id="content">
            <div className="full">
                <h2><Name names={release.album.names} /></h2>
                <ArtistCredit artistCredit={release.album.artistCredit} />

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
            album {
                id
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
