import * as React from "react";

import ArtistCredit from "../components/ArtistCredit";
import Link from "../components/Link";
import Name from "../components/Name";
import { IAlbum } from "../models/Album";

import "./RecentAlbums.css";

interface IProps {
    albums: IAlbum[];
}

const RecentAlbums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a, i) => (
        <li key={i}>
            <Link to="release" params={{ id: a.defaultRelease.id }}>
                <img src={a.defaultRelease.artworkUrls.thumbnail} />
            </Link>
            <div className="released-on">
                [{a.defaultRelease.country}] {a.defaultRelease.releasedOn}
            </div>
            <div className="name">
                <div>
                    <Link to="release" params={{ id: a.defaultRelease.id }}>
                        <Name names={a.names} original={true} />
                    </Link>
                </div>
                <div>
                    <Link to="release" params={{ id: a.defaultRelease.id }}>
                        <Name names={a.names} />
                    </Link>
                </div>
            </div>
            <div className="artist">
                <div><ArtistCredit artistCredit={a.artistCredit} original={true} /></div>
                <div><ArtistCredit artistCredit={a.artistCredit} /></div>
            </div>
        </li>
    ));

    return <ul className="recent-albums">{items}</ul>;
};

export default RecentAlbums;
