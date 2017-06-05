import * as React from "react";

import Link from "../../components/Link";
import Name from "../../components/Name";
import { IAlbum } from "../../models/Album";

interface IProps {
    album: IAlbum;
}

const Album: React.StatelessComponent<IProps> = ({ album }) => {
    const release = album.defaultRelease;

    return (
        <li>
            <div className="artwork">
                <Link to="release" params={{ id: release.id }}>
                    <img src={release.artworkUrls.thumbnail} />
                </Link>
            </div>
            <div className="info">
                <div className="released-on">{release.releasedOn}</div>
                <Link to="release" params={{ id: release.id }}>
                    <Name names={album.names} original={true} />
                </Link>
                <Link to="release" params={{ id: release.id }}>
                    <Name names={album.names} />
                </Link>
            </div>
        </li>
    );
};

export default Album;
