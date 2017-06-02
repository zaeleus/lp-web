import * as React from "react";

import ArtistCredit from "../ArtistCredit";
import { IContribution } from "../../models/Contribution";

interface IProps {
    contributions: IContribution[];
}

const Contributions: React.StatelessComponent<IProps> = ({ contributions }) => {
    const items = contributions.map((c: IContribution, i: number) => (
        <li key={i}>
            <ArtistCredit artistCredit={c.artistCredit} />{" "}
            ({c.kind.toLowerCase()})
        </li>
    ));

    return <ul>{items}</ul>;
};

export default Contributions;