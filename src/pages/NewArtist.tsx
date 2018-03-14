import * as React from "react";

import ArtistForm from "../components/ArtistForm";
import { IArtist } from "../models/Artist";

const artist: IArtist = {
    id: "",

    country: "",
    disambiguation: "",
    endedOn: "",
    kind: "",
    startedOn: "",

    names: [{
        id: "",

        isDefault: true,
        isOriginal: true,
        locale: "",
        name: "",
    }],
} as any;

const NewArtist: React.StatelessComponent<{}> = () => (
    <div id="content">
        <div className="full">
            <h2>New Artist</h2>
            <ArtistForm artist={artist} onSubmit={onSubmit}/>
        </div>
    </div>
);

const onSubmit = () => null;

export default NewArtist;
