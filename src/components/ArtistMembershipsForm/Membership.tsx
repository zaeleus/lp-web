import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import actionCreators from "../../actions/memberships";
import { IArtistMembershipsFormState } from "../../reducers/artist-memberships-form";
import { IMembershipState } from "../../reducers/memberships";
import ArtistCredit from "./ArtistCredit";

import "./Membership.css";

interface IDispatchProps {
    removeMembership(id: string): void;
    setEndedOn(id: string, endedOn: string): void;
    setStartedOn(id: string, startedOn: string): void;
}

interface IOwnProps {
    id: string;
}

interface IStateProps {
    membership: IMembershipState;
}

type Props = IDispatchProps & IOwnProps & IStateProps;

class Membership extends React.Component<Props> {
    public render() {
        const { membership } = this.props;

        return (
            <li>
                <div className="profile">
                    <img src="https://via.placeholder.com/48x48" />
                </div>

                <ArtistCredit id={membership.artistCreditId} />

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
        this.props.setEndedOn(this.props.id, event.currentTarget.value);
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.props.removeMembership(this.props.id);
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setStartedOn(this.props.id, event.currentTarget.value);
    }
}

const mapStateToProps = (
    { artistMembershipsForm }: { artistMembershipsForm: IArtistMembershipsFormState },
    ownProps: IOwnProps,
) => ({
    membership: artistMembershipsForm.memberships[ownProps.id],
});

const mapDispatchToProps = (dispatch: Dispatch<IArtistMembershipsFormState>) => (
    bindActionCreators({
        removeMembership: actionCreators.removeMembership,
        setEndedOn: actionCreators.setEndedOn,
        setStartedOn: actionCreators.setStartedOn,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Membership);
