import * as React from "react";
import { connect } from "react-redux";

import { IArtistCreditNameState } from "../../reducers/artist-credit-names";
import { IArtistFormState } from "../../reducers/artist-form";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    names: IArtistCreditNameState[];
}

type Props = IOwnProps & IStateProps;

const ArtistCredit: React.StatelessComponent<Props> = ({ names }) => {
    const name = names
        .filter((n) => n.isDefault)
        .map((n) => n.name)
        .join();

    return <li>{name}</li>;
};

const mapStateToProps = (
    { artistForm }: { artistForm: IArtistFormState },
    ownProps: IOwnProps,
) => ({
    names: artistForm.artistCredits[ownProps.id].nameIds.map((id) => {
        return artistForm.artistCreditNames[id];
    }),
});

export default connect(mapStateToProps)(ArtistCredit);
