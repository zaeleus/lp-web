import * as React from "react";

import "./SearchBox.css";

interface IProps {
    onSubmit: (query: string) => void;
}

interface IState {
    query: string;
}

class SearchBox extends React.Component<IProps, IState> {
    public state = { query: "" };

    public onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ query: event.currentTarget.value });
    }

    public onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const query = this.state.query.trim();

        if (query !== "") {
            this.props.onSubmit(query);
        }
    }

    public render() {
        return (
            <form className="search-box" onSubmit={this.onSubmit}>
                <input
                    type="search"
                    placeholder="Search for artists, albums, and songs"
                    value={this.state.query}
                    onChange={this.onChange} />
            </form>
        );
    }
}

export default SearchBox;
