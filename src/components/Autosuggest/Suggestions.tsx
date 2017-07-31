import * as React from "react";

import { IArtist } from "../../models/Artist";
import Name from "../Name";

import "./Suggestions.css";

interface IProps {
    activeIndex: number;
    artists: IArtist[];
    isOpen: boolean;
}

const Suggestions: React.StatelessComponent<IProps> = ({ activeIndex, artists, isOpen }) => {
    if (!isOpen) {
        return null;
    }

    if (!artists) {
        return <li>No results.</li>;
    }

    const items = artists.map((a, i) => {
        const className = (i === activeIndex) ? "active" : "";

        return (
            <li key={i} className={className}>
                <Name names={a.names} />
            </li>
        );
    });

    return <ul>{items}</ul>;
};

export default Suggestions;
