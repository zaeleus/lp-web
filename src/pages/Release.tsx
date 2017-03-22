import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Alert from "../components/Alert";
import Media from "../components/Media";
import Header from "../components/Release/Header";
import Meta from "../components/Release/Meta";
import Siblings from "../components/Release/Siblings";
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

    let siblings;

    if (release.siblings.length === 0) {
        siblings = <Alert>No other releases.</Alert>;
    } else {
        siblings = <Siblings releases={release.siblings} />;
    }

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
            siblings {
                id
                disambiguation
            }
        }
    }
`;

export default graphql(FindRelease)(ShowRelease);
