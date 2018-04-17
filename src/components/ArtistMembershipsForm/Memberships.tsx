import * as React from "react";

import {
    IArtistCreditNamesState,
    IArtistCreditsState,
    IMembershipsState,
} from "./index";
import Membership from "./Membership";

interface IProps {
    artistCreditNames: IArtistCreditNamesState;
    artistCredits: IArtistCreditsState;
    membershipIds: string[];
    memberships: IMembershipsState;
    onMembershipStartedOnChange(id: string, startedOn: string): void;
    onMembershipEndedOnChange(id: string, endedOn: string): void;
    removeMembership(id: string): void;
}

const Memberships: React.StatelessComponent<IProps> = ({
    artistCreditNames,
    artistCredits,
    membershipIds,
    memberships,
    onMembershipStartedOnChange,
    onMembershipEndedOnChange,
    removeMembership,
}) => {
    const items = membershipIds
        .map((id) => memberships[id])
        .filter((membership) => !membership._delete)
        .map((membership) => (
            <Membership
                key={membership.id}
                artistCreditNames={artistCreditNames}
                artistCredits={artistCredits}
                membership={membership}
                onMembershipStartedOnChange={onMembershipStartedOnChange}
                onMembershipEndedOnChange={onMembershipEndedOnChange}
                removeMembership={removeMembership}
            />
        ));

    return <ul className="memberships">{items}</ul>;
};

export default Memberships;
