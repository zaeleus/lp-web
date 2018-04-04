import * as React from "react";

import { ISibling } from "../../queries/release/FindRelease";
import Sibling from "./Sibling";

interface IProps {
    releases: ISibling[];
}

const Siblings: React.StatelessComponent<IProps> = ({ releases }) => {
    const items = releases.map((r, i) => <Sibling key={i} release={r} />);
    return <ul>{items}</ul>;
};

export default Siblings;
