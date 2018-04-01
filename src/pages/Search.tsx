import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Loading from "../components/Loading";
import Results from "../components/Search/Results";
import SearchQuery, { IResult } from "../queries/Search";

interface IInputProps {
    query: string;
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

export default graphql<IInputProps>(SearchQuery, {
    props: ({ data }) => ({ ...data }),
})(Search);
