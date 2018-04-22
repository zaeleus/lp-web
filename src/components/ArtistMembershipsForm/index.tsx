import * as React from "react";

import { IArtist } from "../../queries/artist/memberships/FindArtist";
import { FormProvider } from "./Context";
import Roster from "./Roster";

interface IProps {
    artist: IArtist;
}

class ArtistMembershipsForm extends React.Component<IProps> {
    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="group">
                    <label>Roster</label>
                    <FormProvider artist={this.props.artist}>
                        <Roster />
                    </FormProvider>
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

export default ArtistMembershipsForm;
