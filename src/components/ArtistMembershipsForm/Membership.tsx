import * as React from "react";

import ArtistCredit from "./ArtistCredit";

import { IMembership } from "../../queries/artist/memberships/FindArtist";
import "./Membership.css";

interface IProps {
    membership: IMembership;
}

class Membership extends React.Component<IProps> {
    public render() {
        const { membership } = this.props;

        return (
            <li>
                <div className="profile">
                    <img src="https://via.placeholder.com/48x48" />
                </div>

                <ArtistCredit artistCredit={membership.artistCredit} />

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
        // ...
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        // ...
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        // ...
    }
}

export default Membership;
