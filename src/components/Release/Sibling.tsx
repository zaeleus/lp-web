import * as React from "react";

import { ISibling } from "../../queries/release/FindRelease";
import Link from "../Link";

interface IProps {
    release: ISibling;
}

const Sibling: React.StatelessComponent<IProps> = ({ release }) => (
    <li>
        <Link to="release" params={{ id: release.id }}>
            {release.disambiguation || "[default]"}
        </Link>
    </li>
);

export default Sibling;
