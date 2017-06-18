import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";

import Results from "../components/Search/Results";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";
import { ISong } from "../models/Song";

interface IComponentProps {
    query: string;
}

interface IDataProps {
    albums?: IAlbum[];
    artists?: IArtist[];
    loading: boolean;
    songs?: ISong[];
}

type IProps = IComponentProps & IDataProps;

const Search: React.StatelessComponent<IProps> = ({ albums, artists, loading, songs }) => {
    if (!albums || !artists || !songs) {
        return <h2>Not found</h2>;
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div id="content">
            <div className="full">
                <h2>Search</h2>
                <Results
                    artists={artists}
                    albums={albums}
                    songs={songs} />
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

const withData = graphql<IDataProps, IComponentProps>(SearchArtists, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            albums: data.albums,
            artists: data.artists,
            loading: data.loading,
            songs: data.songs,
        };
    },
});

export default withData(Search);
