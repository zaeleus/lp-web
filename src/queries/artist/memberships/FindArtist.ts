import gql from "graphql-tag";

interface IArtistCreditName {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;

    artist: {
        id: string;
    };
}

export interface IArtistCredit {
    id: string;
    names: IArtistCreditName[];
}

export interface IMembership {
    id: string;
    startedOn: string;
    endedOn: string;
    artistCredit: IArtistCredit;
}

export interface IArtist {
    id: string;
    memberships: IMembership[];
}

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id

            memberships {
                id
                startedOn
                endedOn

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
        }
    }
`;

export default FindArtist;
