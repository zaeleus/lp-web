import gql from "graphql-tag";

interface IArtistName {
    id: string;
    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
}

export interface IArtist {
    id: string;
    country: string;
    disambiguation: string;
    kind: string;
    startedOn: string;
    endedOn: string;

    names: IArtistName[];
}

const FindArtistForEdit = gql`
    query FindArtistForEdit($id: ID!) {
        artist(id: $id) {
            id
            country
            disambiguation
            kind
            startedOn
            endedOn

            names {
                id
                name
                locale
                isDefault
                isOriginal
            }
        }
    }
`;

export default FindArtistForEdit;
