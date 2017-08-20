import * as React from "react";
import { connect } from "react-redux";

import { IArtistFormState } from "../../reducers/artist-form";
import { IMembershipState } from "../../reducers/memberships";
import ArtistCredit from "./ArtistCredit";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    membership: IMembershipState;
}

type Props = IOwnProps & IStateProps;

const Membership: React.StatelessComponent<Props> = ({ membership }) => {
    return <li><ArtistCredit id={membership.artistCreditId} /></li>;
};

const mapStateToProps = (
    { artistForm }: { artistForm: IArtistFormState },
    ownProps: IOwnProps,
) => ({
    membership: artistForm.memberships[ownProps.id],
});

export default connect(mapStateToProps)(Membership);
