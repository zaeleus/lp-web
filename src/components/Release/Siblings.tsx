import * as React from "react";

import { IRelease } from "../../models/Release";
import Sibling from "./Sibling";

interface IProps {
    releases: IRelease[];
}

const Siblings: React.StatelessComponent<IProps> = ({ releases }) => {
    const items = releases.map((r: IRelease, i: number) => (
        <Sibling key={i} release={r} />
    ));

    return <ul>{items}</ul>;
};

export default Siblings;
