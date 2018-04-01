import gql from "graphql-tag";
import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Loading from "../components/Loading";
import Results from "../components/Search/Results";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";
import { ISong } from "../models/Song";

interface IInputProps {
    query: string;
}

interface IResult {
    albums: IAlbum[];
    artists: IArtist[];
    songs: ISong[];
}

type Props = IInputProps & DataValue<IResult, IInputProps>;

const Search: React.StatelessComponent<Props> = ({ albums, artists, error, loading, songs }) => {
    if (loading) {
        return <Loading />;
    }

    if (error || !artists || !albums || !songs) {
        return <h2>Error loading search results</h2>;
    }

    return (
        <div id="content">
            <div className="full">
                <h2>Search</h2>
                <Results
                    artists={artists}
                    albums={albums}
                    songs={songs}
                />
            </div>
        </div>
    );
};

const SearchArtists = gql`
    query SearchArtists($query: String!) {
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

export default graphql<IInputProps>(SearchArtists, {
    props: ({ data }) => ({ ...data }),
})(Search);
