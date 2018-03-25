import gql from "graphql-tag";

interface IArtistNameInput {
    id?: string;
    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
}

export interface INewArtistInput {
    disambiguation?: string;
    kind: string;
    country: string;
    startedOn?: string;
    endedOn?: string;

    names: IArtistNameInput[];
}

const CreateArtist = gql`
    mutation CreateArtist($input: NewArtistInput!) {
        createArtist(input: $input) {
            id
        }
    }
`;

export default CreateArtist;
