import * as React from "react";

import { IArtist } from "../../models/Artist";
import Link from "../Link";
import Name from "../Name";

interface IProps {
    artists: IArtist[];
}

const Birthdays: React.StatelessComponent<IProps> = ({ artists }) => {
    const items = artists.map((a: IArtist, i: number) => (
        <li key={i}>
            <Link to="artist" params={{ id: a.id }}>
                <Name names={a.names} />
            </Link>
        </li>
    ));

    return <ul>{items}</ul>;
};

export default Birthdays;
