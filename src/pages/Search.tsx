import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Link from "../components/Link";
import Name from "../components/Name";
import { IArtist } from "../models/Artist";

interface IComponentProps {
    query: string;
}

interface IDataProps {
    artists: IArtist[];
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const Search: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const items = data.artists.map((d: any, i: number) => {
        return (
            <li key={i}>
                <Link to="artist" params={{ id: d.id }}>
                    <Name names={d.names} />
                </Link>
            </li>
        );
    });

    return (
        <div>
            <h2>Search</h2>

            <ul>
                {items}
            </ul>
        </div>
    );
};

const SearchArtists = gql`
    query SearchArtists($query: String!) {
        artists(query: $query) {
            id
            names {
                name
                isDefault
            }
        }
    }
`;

export default graphql(SearchArtists)(Search);
