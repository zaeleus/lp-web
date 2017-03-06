import * as React from "react";

import { IMembership } from "../../models/Membership";
import Groupship from "./Groupship";

interface IProps {
    groupships: IMembership[];
}

const Groupships: React.StatelessComponent<IProps> = ({ groupships }) => {
    const items = groupships.map((m: IMembership, i: number) => (
        <Groupship key={i} groupship={m} />
    ));

    return <ul>{items}</ul>;
};

export default Groupships;
