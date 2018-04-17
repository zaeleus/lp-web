import * as React from "react";

import {
    IArtistCreditNamesState,
    IArtistCreditState,
} from "./index";

interface IProps {
    artistCreditNames: IArtistCreditNamesState;
    artistCredit: IArtistCreditState;
}

const ArtistCredit: React.StatelessComponent<IProps> = ({
    artistCreditNames,
    artistCredit,
}) => {
    const names = artistCredit.nameIds.map((id) => artistCreditNames[id]);

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
