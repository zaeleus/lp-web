import * as React from "react";

import Autosuggest from "../Autosuggest";
import { FormConsumer, IContextProps } from "./Context";
import Memberships from "./Memberships";

const Consumer: React.StatelessComponent<IContextProps> = ({ state }) => {
    return (
        <div>
            <Autosuggest />
            <Memberships membershipIds={state.artist.membershipIds} />
        </div>
    );
};

const Roster: React.StatelessComponent = () => (
    <FormConsumer>{(value) => <Consumer {...value!} />}</FormConsumer>
);

export default Roster;
