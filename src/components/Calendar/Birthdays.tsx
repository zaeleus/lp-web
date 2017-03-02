import * as React from "react";

import { IArtist } from "../../models/Artist";
import Age from "../Age";
import Link from "../Link";
import Name from "../Name";

interface IProps {
    artists: IArtist[];
    date: string;
}

const Birthdays: React.StatelessComponent<IProps> = ({ artists, date }) => {
    const items = artists.map((a: IArtist, i: number) => (
        <li key={i}>
            <Link to="artist" params={{ id: a.id }}>
                <Name names={a.names} />
            </Link>{" "}
            (<Age from={a.startedOn} to={date} />)
        </li>
    ));

    return <ul>{items}</ul>;
};

export default Birthdays;
