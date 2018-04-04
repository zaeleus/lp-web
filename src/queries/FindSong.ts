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
    names: IName[];
}

export interface IRelease {
    id: string;
    album: IAlbum;
}

export interface IContribution {
    id: string;
    kind: string;
    artistCredit: IArtistCredit;
}

export interface ISongUrl {
    id: string;
    name: string;
    url: string;
}

export interface ISong {
    id: string;
    names: IName[];
    artistCredit: IArtistCredit;
    appearsOn: IRelease[];
    contributions: IContribution[];
    urls: ISongUrl[];
}

const FindSong = gql`
    query FindSong($id: ID!) {
        song(id: $id) {
            id

            names {
                id
                name
                isDefault
                isOriginal
            }

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

            appearsOn {
                id

                album {
                    id

                    names {
                        id
                        name
                        isDefault
                        isOriginal
                    }
                }
            }

            contributions {
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
            }

            urls {
                id
                name
                url
            }
        }
    }
`;

export default FindSong;
