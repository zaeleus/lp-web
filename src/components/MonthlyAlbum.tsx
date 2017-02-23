import * as React from "react";

import ArtistCredit from "../components/ArtistCredit";
import Link from "../components/Link";
import { IAlbum } from "../models/Album";
import * as Nameable from "../models/Nameable";

interface IProps {
    album: IAlbum;
}

const Album: React.StatelessComponent<IProps> = ({ album }) => {
    return (
        <li>
            [{album.defaultRelease.releasedOn}]{" "}
            <ArtistCredit artistCredit={album.artistCredit} />
            {" - "}
            <Link to="release" params={{ id: album.defaultRelease.id }}>
                {Nameable.defaultName(album.names)}
            </Link>
        </li>
    );
};

export default Album;
