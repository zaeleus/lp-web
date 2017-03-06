import * as React from "react";

import Link from "../../components/Link";
import Name from "../../components/Name";
import { IMembership } from "../../models/Membership";

interface IProps {
    groupship: IMembership;
}

const Membership: React.StatelessComponent<IProps> = ({ groupship }) => {
    const group = groupship.group;

    return (
        <li>
            <Link to="artist" params={{ id: group.id }}>
                <Name names={group.names} />
            </Link>
        </li>
    );
};

export default Membership;
