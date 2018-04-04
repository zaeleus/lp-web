import gql from "graphql-tag";

interface IName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
}

interface IArtistCreditName extends IName {
    position: number;
    separator: string;
    artist: {
        id: string;
    };
}

interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}

interface IAlbum {
    id: string;
    kind: string;
    artistCredit: IArtistCredit;
    names: IName[];
}

export interface IReleaseUrl {
    id: string;
    name: string;
    url: string;
}

export interface ITrack {
    id: string;
    position: number;
    duration: number;
    artistCredit: IArtistCredit;
    names: IName[];
    song: {
        id: string;
    };
}

export interface IMedium {
    id: string;
    position: number;
    kind: string;
    tracks: ITrack[];
}

export interface ISibling {
    id: string;
    disambiguation: string;
}

export interface IRelease {
    id: string;
    releasedOn: string;
    country: string;
    catalogNumber: string;
    disambiguation: string;

    artworkUrls: {
        original: string;
        thumbnail: string;
    };

    album: IAlbum;
    urls: IReleaseUrl[];
    media: IMedium[];
    siblings: ISibling[];
}

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
                id
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

export default FindRelease;
