import * as React from "react";
import { ApolloClient, withApollo } from "react-apollo";

import { IArtist } from "../../models/Artist";
import Suggestions from "./Suggestions";

interface IProps {
    client: ApolloClient;
}

interface IState {
    suggestions: IArtist[];
}

class Autosuggest extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = { suggestions: [] };
    }

    public render() {
        return (
            <div className="autosuggest">
                <input type="text" onChange={this.onQueryChange} />
                <Suggestions artists={this.state.suggestions} />
            </div>
        );
    }

    private onQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        this.fetchSuggestions(query);
    }

    private fetchSuggestions = async (query: string) => {
        const res = await fetch("/graphql", {
            body: JSON.stringify({
                operationName: "AutosuggestArtists",
                query: `
                    query AutosuggestArtists($query: String!, $limit: Int) {
                        artists(query: $query, limit: $limit) {
                            id
                            names {
                                id
                                name
                                isDefault
                                isOriginal
                            }
                        }
                    }
                `,
                variables: { query, limit: 10 },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            method: "POST",
        });

        const json = await res.json();
        const suggestions = json.data.artists as IArtist[];

        this.setState({ suggestions });
    }
}

export default withApollo(Autosuggest);
