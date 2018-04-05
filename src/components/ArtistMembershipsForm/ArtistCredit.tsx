import * as React from "react";

import { IArtistCredit } from "../../queries/artist/memberships/FindArtist";

interface IProps {
    artistCredit: IArtistCredit;
}

const ArtistCredit: React.StatelessComponent<IProps> = ({ artistCredit }) => {
    const { names } = artistCredit;

    const defaultName = names
        .filter((n) => n.isDefault)
        .map((n) => n.name)
        .join();

    const originalName = names
        .filter((n) => n.isOriginal)
        .map((n) => n.name)
        .join();

    return (
        <div className="names">
            <div>{originalName}</div>
            <div>{defaultName}</div>
        </div>
    );
};

export default ArtistCredit;
