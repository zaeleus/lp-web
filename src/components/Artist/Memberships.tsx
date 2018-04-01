import * as React from "react";

import { IMembership } from "../../queries/artist/FindArtist";
import Membership from "./Membership";

interface IProps {
    memberships: IMembership[];
}

const Memberships: React.StatelessComponent<IProps> = ({ memberships }) => {
    const items = memberships.map((m, i) => (
        <Membership key={i} membership={m} />
    ));

    return <ul>{items}</ul>;
};

export default Memberships;
