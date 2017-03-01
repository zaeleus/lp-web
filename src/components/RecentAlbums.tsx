import * as React from "react";

import ArtistCredit from "../components/ArtistCredit";
import Link from "../components/Link";
import Name from "../components/Name";
import { IAlbum } from "../models/Album";

interface IProps {
    albums: IAlbum[];
}

const RecentAlbums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a: IAlbum, i: number) => (
        <li key={i}>
            [{a.defaultRelease.releasedOn}]{" "}
            <ArtistCredit artistCredit={a.artistCredit} />
            {" - "}
            <Link to="release" params={{ id: a.defaultRelease.id }}>
                <Name names={a.names} />
            </Link>
        </li>
    ));

    return <ul>{items}</ul>;
};

export default RecentAlbums;
