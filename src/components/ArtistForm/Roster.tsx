import * as React from "react";

import Autosuggest from "../Autosuggest";
import Memberships from "./Memberships";

interface IProps {
    memberships: string[];
}

const Roster: React.StatelessComponent<IProps> = ({ memberships }) => (
    <div>
        <Autosuggest />
        <Memberships memberships={memberships} />
    </div>
);

export default Roster;
