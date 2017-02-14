import * as React from "react";

import Link from "../../components/Link";
import { IMembership } from "../../models/Membership";
import * as Nameable from "../../models/Nameable";

interface IProps {
    membership: IMembership;
}

const Membership: React.StatelessComponent<IProps> = ({ membership }) => {
    const artistCredit = membership.artistCredit;
    return (
        <li>
            <Link to="artist" params={{ id: artistCredit.names[0].artist.id }}>
                {Nameable.defaultName(artistCredit.names)}
            </Link>
        </li>
    );
};

export default Membership;
