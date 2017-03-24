import * as React from "react";

import "./Meta.css";

import { IArtist } from "../../models/Artist";

interface IProps {
    artist: IArtist;
}

const Meta: React.StatelessComponent<IProps> = ({ artist }) => {
    const startedOn = artist.startedOn || "—";
    const endedOn = artist.endedOn || "—";

    return (
        <div className="artist-meta">
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
