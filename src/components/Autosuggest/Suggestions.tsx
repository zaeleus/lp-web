import * as React from "react";

import { IArtist } from "../../models/Artist";
import Name from "../Name";

interface IProps {
    artists: IArtist[];
}

const Suggestions: React.StatelessComponent<IProps> = ({ artists }) => {
    if (!artists) {
        return <li>No results.</li>;
    }

    const items = artists.map((a, i) => (
        <li key={i}><Name names={a.names} /></li>
    ));

    return <ul>{items}</ul>;
};

export default Suggestions;
