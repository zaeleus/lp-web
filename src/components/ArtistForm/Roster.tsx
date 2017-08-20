import * as React from "react";

import Autosuggest from "../Autosuggest";
import Memberships from "./Memberships";

interface IProps {
    membershipIds: string[];
}

const Roster: React.StatelessComponent<IProps> = ({ membershipIds }) => (
    <div>
        <Autosuggest />
        <Memberships membershipIds={membershipIds} />
    </div>
);

export default Roster;
