import * as React from "react";

import { IRelease } from "../../models/Release";
import ArtistCredit from "../ArtistCredit";
import Name from "../Name";

import "./Header.css";

interface IProps {
    release: IRelease;
}

const Header: React.StatelessComponent<IProps> = ({ release }) => (
    <header className="release">
        <div className="artwork">
            <img src={release.artworkUrl} />
        </div>

        <div className="info">
            <h2>
                <div><Name names={release.album.names} /></div>
                <div><Name names={release.album.names} original={true} /></div>
            </h2>

            <div><ArtistCredit artistCredit={release.album.artistCredit} /></div>
            <div><ArtistCredit artistCredit={release.album.artistCredit} original={true} /></div>
        </div>
    </header>
);

export default Header;
