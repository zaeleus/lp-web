import * as React from "react";

import Link from "../components/Link";
import { IArtistCredit } from "../models/ArtistCredit";
import { IArtistCreditName } from "../models/ArtistCreditName";

interface IProps {
    artistCredit: IArtistCredit;
}

const ArtistCredit: React.StatelessComponent<IProps> = ({ artistCredit }) => {
    const names = artistCredit.names
        .filter((n) => n.isDefault)
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