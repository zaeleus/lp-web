import * as React from "react";

import ArtistCredit from "./ArtistCredit";
import {
    IArtistCreditNamesState,
    IArtistCreditsState,
    IMembershipState,
} from "./index";

import "./Membership.css";

interface IProps {
    artistCreditNames: IArtistCreditNamesState;
    artistCredits: IArtistCreditsState;
    membership: IMembershipState;
    onMembershipStartedOnChange(id: string, startedOn: string): void;
    onMembershipEndedOnChange(id: string, endedOn: string): void;
    removeMembership(id: string): void;
}

class Membership extends React.Component<IProps> {
    public render() {
        const { artistCreditNames, artistCredits, membership } = this.props;
        const { artistCreditId } = membership;

        const artistCredit = artistCredits[artistCreditId];

        return (
            <li>
                <div className="profile">
                    <img src="https://via.placeholder.com/48x48" />
                </div>

                <ArtistCredit
                    artistCreditNames={artistCreditNames}
                    artistCredit={artistCredit}
                />

                <div className="dates">
                    <div className="started-on group">
                        <label>Started On</label>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={membership.startedOn || ""}
                            onChange={this.onStartedOnChange}
                        />
                    </div>
                    <div className="ended-on group">
                        <label>Ended On</label>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={membership.endedOn || ""}
                            onChange={this.onEndedOnChange}
                        />
                    </div>
                </div>

                <div className="actions">
                    <a href="#" onClick={this.onRemoveClick}>[x]</a>
                </div>
            </li>
        );
    }

    private onEndedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { membership, onMembershipEndedOnChange } = this.props;
        const endedOn = event.currentTarget.value;
        onMembershipEndedOnChange(membership.id, endedOn);
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const { membership, removeMembership } = this.props;
        removeMembership(membership.id);
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { membership, onMembershipStartedOnChange } = this.props;
        const startedOn = event.currentTarget.value;
        onMembershipStartedOnChange(membership.id, startedOn);
    }
}

export default Membership;
