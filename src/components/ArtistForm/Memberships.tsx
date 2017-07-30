import * as React from "react";

import Membership from "./Membership";

interface IProps {
    memberships: string[];
}

const Memberships: React.StatelessComponent<IProps> = ({ memberships }) => {
    const items = memberships.map((m, i) => <Membership key={i} id={m} />);
    return <ul>{items}</ul>;
};

export default Memberships;
