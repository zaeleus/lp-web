import * as React from "react";

import Link from "../../components/Link";
import Name from "../../components/Name";
import { IMembership } from "../../queries/artist/FindArtist";

interface IProps {
    membership: IMembership;
}

const Membership: React.StatelessComponent<IProps> = ({ membership }) => {
    const { artistCredit } = membership;

    return (
        <li>
            <Link to="artist" params={{ id: artistCredit.names[0].artist.id }}>
                <Name names={artistCredit.names} />
            </Link>
        </li>
    );
};

export default Membership;
