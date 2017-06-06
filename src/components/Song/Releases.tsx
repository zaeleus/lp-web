import * as React from "react";

import { IRelease } from "../../models/Release";
import Link from "../Link";
import Name from "../Name";

interface IProps {
    releases: IRelease[];
}

const Urls: React.StatelessComponent<IProps> = ({ releases }) => {
    const items = releases.map((r: IRelease, i: number) => (
        <li key={i}>
            <Link to="release" params={{ id: r.id }}>
                <Name names={r.album.names} />
            </Link>
        </li>
    ));

    return <ul>{items}</ul>;
};

export default Urls;
