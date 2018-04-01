import * as React from "react";

import "./Meta.css";

import { IArtist } from "../../queries/artist/FindArtist";

interface IProps {
    artist: IArtist;
}

const Meta: React.StatelessComponent<IProps> = ({ artist }) => {
    const startedOn = artist.startedOn || "—";
    const endedOn = artist.endedOn || "—";

    return (
        <div className="artist-meta">
            <dl>
                <dt>Kind</dt>
                <dd>{artist.kind}</dd>
            </dl>
            <dl>
                <dt>Country</dt>
                <dd>{artist.country}</dd>
            </dl>
            <dl>
                <dt>Start Date</dt>
                <dd>{startedOn}</dd>
            </dl>
            <dl>
                <dt>End Date</dt>
                <dd>{endedOn}</dd>
            </dl>
        </div>
    );
};

export default Meta;
