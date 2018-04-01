import gql from "graphql-tag";

interface INameable {
    id: string;
    name: string;
    isDefault: boolean;
}

interface IArtist {
    id: string;
    names: INameable[];
}

interface IRelease {
    id: string;
    releasedOn: string;
}

interface IAlbum {
    id: string;
    names: INameable[];
    defaultRelease: IRelease;
}

interface ISong {
    id: string;
    names: INameable[];
}

export interface IResult {
    artists: IArtist[];
    albums: IAlbum[];
    songs: ISong[];
}

const Search = gql`
    query Search($query: String!) {
        artists(query: $query) {
            id

            names {
                id
                name
                isDefault
            }
        }

        albums(query: $query) {
            id

            names {
                id
                name
                isDefault
            }

            defaultRelease {
                id
                releasedOn
            }
        }

        songs(query: $query) {
            id

            names {
                id
                name
                isDefault
            }
        }
    }
`;

export default Search;
