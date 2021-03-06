import * as React from "react";

import ArtistCredit from "../components/ArtistCredit";
import Link from "../components/Link";
import Name from "../components/Name";
import { IAlbum } from "../queries/GetRecentAlbums";

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
            <div className="meta">
                <span className="country">[{a.defaultRelease.country}]</span>
                <span className="released-on">{a.defaultRelease.releasedOn}</span>
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
