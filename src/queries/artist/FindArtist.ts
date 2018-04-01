import gql from "graphql-tag";

export interface IArtistName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
}

interface IGroup {
    id: string;
    names: IArtistName[];
}

export interface IGroupship {
    id: string;
    group: IGroup;
}

interface IArtistCreditName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;

    artist: {
        id: string;
    };
}

interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}

export interface IMembership {
    id: string;
    artistCredit: IArtistCredit;
}

interface IAlbumName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
}

interface IRelease {
    id: string;
    country: string;
    releasedOn: string;

    artworkUrls: {
        thumbnail: string;
    };
}

export interface IAlbum {
    id: string;

    names: IAlbumName[];
    defaultRelease: IRelease;
}

interface IArtistUrl {
    id: string;
    url: string;
    name: string;
}

export interface IArtist {
    id: string;

    kind: string;
    country: string;
    startedOn: string;
    endedOn: string;

    names: IArtistName[];
    groupships: IGroupship[];
    memberships: IMembership[];
    albums: IAlbum[];
    urls: IArtistUrl[];
}

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            kind
            country
            startedOn
            endedOn

            names {
                id
                name
                isDefault
                isOriginal
            }

            groupships {
                id

                group {
                    id

                    names {
                        id
                        name
                        isDefault
                        isOriginal
                    }
                }
            }

            memberships {
                id

                artistCredit {
                    id

                    names {
                        id
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
                    id
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

export default FindArtist;
