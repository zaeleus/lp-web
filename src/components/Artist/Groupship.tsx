import * as React from "react";

import Link from "../../components/Link";
import Name from "../../components/Name";
import { IGroupship } from "../../queries/artist/FindArtist";

interface IProps {
    groupship: IGroupship;
}

const Membership: React.StatelessComponent<IProps> = ({ groupship }) => {
    const { group } = groupship;

    return (
        <li>
            <Link to="artist" params={{ id: group.id }}>
                <Name names={group.names} />
            </Link>
        </li>
    );
};

export default Membership;
