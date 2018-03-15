import * as React from "react";

import Link from "../components/Link";

interface IArtist {
    id: string;
}

interface IArtistCreditName {
    name: string;
    position: number;
    isOriginal: boolean;
    isDefault: boolean;
    separator: string;
    artist: IArtist;
}

interface IArtistCredit {
    names: IArtistCreditName[];
}

interface IProps {
    artistCredit: IArtistCredit;
    original?: boolean;
}

const ArtistCredit: React.StatelessComponent<IProps> = ({ artistCredit, original }) => {
    const names = artistCredit.names
        .filter((n) => original ? n.isOriginal : n.isDefault)
        .sort((a, b) => a.position - b.position)
        .map((n: IArtistCreditName, i: number) => (
            <span key={i}>
                <Link to="artist" params={{ id: n.artist.id }}>
                    {n.name}
                </Link>
                {n.separator}
            </span>
        ));

    return <span>{names}</span>;
};

export default ArtistCredit;
