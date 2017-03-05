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
        <td className="name"><Name names={track.names} /></td>
        <td className="artist"><ArtistCredit artistCredit={track.artistCredit} /></td>
        <td className="duration"><Duration duration={track.duration} /></td>
    </tr>
);

export default Track;
