import * as React from "react";

import { IArtistName } from "../../queries/artist/FindArtist";
import Name from "../Name";

interface IArtist {
    names: IArtistName[];
}

export interface IProps {
    artist: IArtist;
}

const Header: React.StatelessComponent<IProps> = ({ artist }) => (
    <header className="artist">
        <h2>
            <div><Name names={artist.names} original={true} /></div>
            <div><Name names={artist.names} /></div>
        </h2>
    </header>
);

export default Header;
