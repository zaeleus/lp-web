import gql from "graphql-tag";

export interface IRelease {
    id: string;
    country: string;
    releasedOn: string;
    artworkUrls: {
        thumbnail: string;
    };
}

export interface IArtist {
    id: string;
}

export interface IArtistCreditName {
    id: string;
    position: number;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
    separator: string;
    artist: IArtist;
}

export interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}

export interface IName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
}

export interface IAlbum {
    id: string;
    names: IName[];
    artistCredit: IArtistCredit;
    defaultRelease: IRelease;
}

export interface IRecentAlbums {
    recentAlbums: IAlbum[];
}

const GetRecentAlbums = gql`
    {
        recentAlbums {
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

            defaultRelease {
                id
                country
                releasedOn

                artworkUrls {
                    thumbnail
                }
            }
        }
    }
`;

export default GetRecentAlbums;
