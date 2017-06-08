import * as React from "react";

import { ISong } from "../../models/Song";
import ArtistCredit from "../ArtistCredit";
import Name from "../Name";

import "./Header.css";

interface IProps {
    song: ISong;
}

const Header: React.StatelessComponent<IProps> = ({ song }) => (
    <header className="song">
        <h2>
            <div><Name names={song.names} original={true} /></div>
            <div><Name names={song.names} /></div>
        </h2>

        <div><ArtistCredit artistCredit={song.artistCredit} original={true} /></div>
        <div><ArtistCredit artistCredit={song.artistCredit} /></div>
    </header>
);

export default Header;
