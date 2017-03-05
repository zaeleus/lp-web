import * as React from "react";

import { ITrack } from "../models/Track";
import ArtistCredit from "./ArtistCredit";
import Duration from "./Duration";
import Name from "./Name";

import "./Track.css";

interface IProps {
    track: ITrack;
}

const Track: React.StatelessComponent<IProps> = ({ track }) => (
    <tr>
        <td className="position">{track.position}</td>
        <td className="name">
            <div><Name names={track.names} /></div>
            <div><Name names={track.names} original={true} /></div>
        </td>
        <td className="artist">
            <div><ArtistCredit artistCredit={track.artistCredit} /></div>
            <div><ArtistCredit artistCredit={track.artistCredit} original={true} /></div>
        </td>
        <td className="duration"><Duration duration={track.duration} /></td>
    </tr>
);

export default Track;
