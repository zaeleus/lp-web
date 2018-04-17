import * as React from "react";

import Autosuggest from "../Autosuggest";
import {
    IArtistCreditNamesState,
    IArtistCreditsState,
    IMembershipsState,
} from "./index";
import Memberships from "./Memberships";

interface IProps {
    artistCreditNames: IArtistCreditNamesState;
    artistCredits: IArtistCreditsState;
    membershipIds: string[];
    memberships: IMembershipsState;
    onMembershipStartedOnChange(id: string, startedOn: string): void;
    onMembershipEndedOnChange(id: string, endedOn: string): void;
    removeMembership(id: string): void;
}

const Roster: React.StatelessComponent<IProps> = ({
    artistCredits,
    artistCreditNames,
    membershipIds,
    memberships,
    onMembershipStartedOnChange,
    onMembershipEndedOnChange,
    removeMembership,
}) => (
    <div>
        <Autosuggest />
        <Memberships
            artistCreditNames={artistCreditNames}
            artistCredits={artistCredits}
            membershipIds={membershipIds}
            memberships={memberships}
            onMembershipStartedOnChange={onMembershipStartedOnChange}
            onMembershipEndedOnChange={onMembershipEndedOnChange}
            removeMembership={removeMembership}
        />
    </div>
);

export default Roster;
