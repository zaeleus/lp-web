import * as React from "react";

import { IArtist } from "../../models/Artist";
import Suggestions from "./Suggestions";

interface IState {
    activeIndex: number;
    isOpen: boolean;
    suggestions: IArtist[];
}

class Autosuggest extends React.Component<{}, IState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            activeIndex: 0,
            isOpen: false,
            suggestions: [],
        };
    }

    public render() {
        return (
            <div className="autosuggest">
                <input type="text"
                    onChange={this.onQueryChange}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp} />
                <Suggestions
                    artists={this.state.suggestions}
                    activeIndex={this.state.activeIndex}
                    isOpen={this.state.isOpen} />
            </div>
        );
    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 13: // enter
                event.preventDefault();
                break;
            case 27: // escape
                this.close();
                break;
        }
    }

    private onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 38: // up arrow
                this.open();
                this.prevItem();
                break;
            case 40: // down arrow
                this.open();
                this.nextItem();
                break;
        }
    }

    private onQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        this.fetchSuggestions(query);
    }

    private open() {
        this.setState({ isOpen: true });
    }

    private close() {
        this.setState({
            activeIndex: 0,
            isOpen: false,
        });
    }

    private prevItem() {
        let i = this.state.activeIndex - 1;
        if (i < 0) { i = this.state.suggestions.length - 1; }
        this.setState({ activeIndex: i });
    }

    private nextItem() {
        let i = this.state.activeIndex + 1;
        if (i >= this.state.suggestions.length) { i = 0; }
        this.setState({ activeIndex: i });
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
        this.open();
    }
}

export default Autosuggest;
