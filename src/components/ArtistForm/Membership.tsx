import * as React from "react";
import { connect } from "react-redux";

// import ArtistCredit from "../ArtistCredit";
import { IArtistCredit, IArtistCreditName, IState } from "../../reducers/artist-form";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    artistCredit: IArtistCredit;
    artistCreditNames: { [key: string]: IArtistCreditName };
}

type Props = IOwnProps & IStateProps;

const Membership: React.StatelessComponent<Props> = ({ artistCredit, artistCreditNames }) => {
    const name = artistCredit.names
        .map((id) => artistCreditNames[id])
        .filter((n) => n.isDefault)
        .map((n) => n.name)
        .join();

    return <li>{name}</li>;
};

const mapStateToProps = ({ artistForm }: { artistForm: IState }, ownProps: IOwnProps) => ({
    artistCredit: artistForm.artistCredits[ownProps.id],
    artistCreditNames: artistForm.artistCreditNames,
});

export default connect(mapStateToProps)(Membership);
