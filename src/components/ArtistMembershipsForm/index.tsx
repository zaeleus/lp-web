import * as React from "react";
import { connect } from "react-redux";

import { IArtistMembershipsArtistState } from "../../reducers/artist-memberships-artist";
import { IArtistMembershipsFormState } from "../../reducers/artist-memberships-form";
import Roster from "./Roster";

interface IStateProps {
    artist: IArtistMembershipsArtistState;
}

type Props = IStateProps;

class ArtistMembershipsForm extends React.Component<Props> {
    public render() {
        const { artist } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="group">
                    <label>Roster</label>
                    <Roster membershipIds={artist.membershipIds} />
                </div>

                <div className="group">
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
}

const mapStateToProps = (
    { artistMembershipsForm }: { artistMembershipsForm: IArtistMembershipsFormState },
) => ({
    artist: artistMembershipsForm.artist,
});

export default connect(mapStateToProps)(ArtistMembershipsForm);
