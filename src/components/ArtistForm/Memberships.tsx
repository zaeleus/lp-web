import * as React from "react";

import Membership from "./Membership";

interface IProps {
    membershipIds: string[];
}

const Memberships: React.StatelessComponent<IProps> = ({ membershipIds }) => {
    const items = membershipIds.map((id, i) => <Membership key={i} id={id} />);
    return <ul>{items}</ul>;
};

export default Memberships;
