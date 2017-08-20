import * as React from "react";
import { connect } from "react-redux";

import { IArtistCreditNamesState } from "../../reducers/artist-credit-names";
import { IArtistCreditState } from "../../reducers/artist-credits";
import { IArtistFormState } from "../../reducers/artist-form";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    artistCredit: IArtistCreditState;
    artistCreditNames: IArtistCreditNamesState;
}

type Props = IOwnProps & IStateProps;

const Membership: React.StatelessComponent<Props> = ({ artistCredit, artistCreditNames }) => {
    const name = artistCredit.nameIds
        .map((id) => artistCreditNames[id])
        .filter((n) => n.isDefault)
        .map((n) => n.name)
        .join();

    return <li>{name}</li>;
};

const mapStateToProps = (
    { artistForm }: { artistForm: IArtistFormState },
    ownProps: IOwnProps,
) => ({
    artistCredit: artistForm.artistCredits[ownProps.id],
    artistCreditNames: artistForm.artistCreditNames,
});

export default connect(mapStateToProps)(Membership);
