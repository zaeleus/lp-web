import * as React from "react";

import ArtistForm from "../components/ArtistForm";

const NewArtist: React.StatelessComponent<{}> = () => (
    <div id="content">
        <div className="full">
            <h2>New Artist</h2>
            <ArtistForm onSubmit={onSubmit}/>
        </div>
    </div>
);

const onSubmit = () => null;

export default NewArtist;
