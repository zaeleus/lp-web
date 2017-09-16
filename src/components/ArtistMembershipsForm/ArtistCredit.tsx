import * as React from "react";
import { connect } from "react-redux";

import { IArtistCreditNameState } from "../../reducers/artist-credit-names";
import { IArtistMembershipsFormState } from "../../reducers/artist-memberships-form";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    names: IArtistCreditNameState[];
}

type Props = IOwnProps & IStateProps;

const ArtistCredit: React.StatelessComponent<Props> = ({ names }) => {
    const defaultName = names.filter((n) => n.isDefault).map((n) => n.name).join();
    const originalName = names.filter((n) => n.isOriginal).map((n) => n.name).join();

    return (
        <div className="names">
            <div>{originalName}</div>
            <div>{defaultName}</div>
        </div>
    );
};

const mapStateToProps = (
    { artistMembershipsForm }: { artistMembershipsForm: IArtistMembershipsFormState },
    ownProps: IOwnProps,
) => ({
    names: artistMembershipsForm.artistCredits[ownProps.id].nameIds.map((id) => (
        artistMembershipsForm.artistCreditNames[id]
    )),
});

export default connect(mapStateToProps)(ArtistCredit);
