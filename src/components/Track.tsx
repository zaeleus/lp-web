import * as React from "react";

import { ITrack } from "../models/Track";
import ArtistCredit from "./ArtistCredit";
import Name from "./Name";

interface IProps {
    track: ITrack;
}

const Track: React.StatelessComponent<IProps> = ({ track }) => (
    <tr>
        <td>{track.position}</td>
        <td><Name names={track.names} /></td>
        <td><ArtistCredit artistCredit={track.artistCredit} /></td>
        <td>{track.duration}</td>
    </tr>
);

export default Track;
