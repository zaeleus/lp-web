import * as React from "react";

import { IRelease } from "../../models/Release";
import Link from "../Link";

interface IProps {
    release: IRelease;
}

const Sibling: React.StatelessComponent<IProps> = ({ release }) => (
    <li>
        <Link to="release" params={{ id: release.id }}>
            {release.disambiguation || "[default]"}
        </Link>
    </li>
);

export default Sibling;
