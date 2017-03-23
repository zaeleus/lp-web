import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Results from "../components/Search/Results";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";

interface IComponentProps {
    query: string;
}

interface IDataProps {
    artists: IArtist[];
    albums: IAlbum[];
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const Search: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const albums = data.albums;
    const artists = data.artists;

    return (
        <div id="content">
            <div className="full">
                <h2>Search</h2>
                <Results artists={artists} albums={albums} />
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
    }
`;

export default graphql(SearchArtists)(Search);
