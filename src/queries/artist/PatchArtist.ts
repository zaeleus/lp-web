import gql from "graphql-tag";

interface IArtistNameInput {
    id?: string;
    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
}

export interface IArtistInput {
    id: string;
    disambiguation?: string;
    kind: string;
    country: string;
    startedOn?: string;
    endedOn?: string;

    names?: IArtistNameInput[];
}

const PatchArtist = gql`
    mutation PatchArtist($input: ArtistInput!) {
        patchArtist(input: $input) {
            id
            kind
            country
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

export default PatchArtist;
