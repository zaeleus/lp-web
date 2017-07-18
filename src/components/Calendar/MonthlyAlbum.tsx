import * as React from "react";

import ArtistCredit from "../../components/ArtistCredit";
import Link from "../../components/Link";
import Name from "../../components/Name";
import { IAlbum } from "../../models/Album";

import "./MonthlyAlbum.css";

interface IProps {
    album: IAlbum;
}

const Album: React.StatelessComponent<IProps> = ({ album }) => {
    return (
        <li className="monthly-album">
            <div className="artwork">
                <Link to="release" params={{ id: album.defaultRelease.id }}>
                    <img src={album.defaultRelease.artworkUrls.thumbnail} />
                </Link>
            </div>
            <div className="info">
                <div className="released-on">{album.defaultRelease.releasedOn}</div>
                <div className="names">
                    <div>
                        <Link to="release" params={{ id: album.defaultRelease.id }}>
                            <Name names={album.names} original={true} />
                        </Link>
                    </div>
                    <div>
                        <Link to="release" params={{ id: album.defaultRelease.id }}>
                            <Name names={album.names} />
                        </Link>
                    </div>
                </div>
                <div className="artist-credit">
                    <div><ArtistCredit artistCredit={album.artistCredit} original={true} /></div>
                    <div><ArtistCredit artistCredit={album.artistCredit} /></div>
                </div>
            </div>
        </li>
    );
};

export default Album;
