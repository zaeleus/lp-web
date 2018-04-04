import gql from "graphql-tag";

interface IName {
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

interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}

interface IArtistCreditName extends IName {
    position: number;
    separator: string;
    artist: {
        id: string;
    };
}

export interface IAlbum {
    id: string;
    names: IName[];
    defaultRelease: IRelease;
    artistCredit: IArtistCredit;
}

export interface IArtist {
    id: string;
    startedOn: string;
    names: IName[];
}

const AlbumsByReleaseMonth = gql`
    query GetCalendar($date: String!) {
        albumsByReleaseMonth(date: $date) {
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

        artistsByStartMonth(date: $date) {
            id
            startedOn

            names {
                id
                name
                isDefault
                isOriginal
            }
        }
    }
`;

export default AlbumsByReleaseMonth;
