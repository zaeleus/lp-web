import * as React from "react";

import { IMembership } from "../../queries/artist/memberships/FindArtist";
import Autosuggest from "../Autosuggest";
import Memberships from "./Memberships";

interface IProps {
    memberships: IMembership[];
}

const Roster: React.StatelessComponent<IProps> = ({ memberships }) => (
    <div>
        <Autosuggest />
        <Memberships memberships={memberships} />
    </div>
);

export default Roster;
