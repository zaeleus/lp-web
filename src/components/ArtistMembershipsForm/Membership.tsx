import * as React from "react";

import ArtistCredit from "./ArtistCredit";
import { FormConsumer, IContextProps, IMembershipState } from "./Context";

import "./Membership.css";

interface IProps {
    membership: IMembershipState;
}

type ConsumerProps = IContextProps & IProps;

class Consumer extends React.Component<ConsumerProps> {
    public render() {
        const { membership, state } = this.props;
        const { artistCredits } = state;
        const { artistCreditId } = membership;

        const artistCredit = artistCredits[artistCreditId];

        return (
            <li>
                <div className="profile">
                    <img src="https://via.placeholder.com/48x48" />
                </div>

                <ArtistCredit artistCredit={artistCredit} />

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
        const { actions, membership } = this.props;
        const endedOn = event.currentTarget.value;
        actions.onMembershipEndedOnChange(membership.id, endedOn);
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const { actions, membership } = this.props;
        actions.removeMembership(membership.id);
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { actions, membership } = this.props;
        const startedOn = event.currentTarget.value;
        actions.onMembershipStartedOnChange(membership.id, startedOn);
    }
}

const Membership: React.StatelessComponent<IProps> = (props) => (
    <FormConsumer>
        {(value) => <Consumer {...props} {...value!} />}
    </FormConsumer>
);

export default Membership;
