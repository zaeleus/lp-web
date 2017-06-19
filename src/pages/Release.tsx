import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";

import Alert from "../components/Alert";
import Header from "../components/Release/Header";
import Media from "../components/Release/Media";
import Meta from "../components/Release/Meta";
import Siblings from "../components/Release/Siblings";
import Urls from "../components/Release/Urls";
import { IRelease } from "../models/Release";

interface IComponentProps {
    id: string;
}

interface IDataProps {
    loading: boolean;
    release?: IRelease;
}

type IProps = IComponentProps & IDataProps;

const ShowRelease: React.StatelessComponent<IProps> = ({ loading, release }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!release) {
        return <h2>Not found</h2>;
    }

    const siblings = (release.siblings.length === 0)
        ? <Alert>No other releases.</Alert>
        : <Siblings releases={release.siblings} />;

    return (
        <div id="content">
            <div className="full">
                <Header release={release} />

                <Meta release={release} />

                <h3>Tracklist</h3>
                <Media media={release.media} />

                <h3>Other Releases</h3>
                {siblings}

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
            disambiguation
            artworkUrls {
                original
                thumbnail
            }
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
                    song {
                        id
                    }
                }
            }
            siblings {
                id
                disambiguation
            }
        }
    }
`;

const withData = graphql<IDataProps, IComponentProps>(FindRelease, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            loading: data.loading,
            release: data.release,
        };
    },
});

export default withData(ShowRelease);
