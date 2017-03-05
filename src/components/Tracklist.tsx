import * as React from "react";

import { ITrack } from "../models/Track";
import Track from "./Track";

import "./Tracklist.css";

interface IProps {
    tracks: ITrack[];
}

const Tracklist: React.StatelessComponent<IProps> = ({ tracks }) => {
    const rows = tracks.map((t: ITrack, i: number) => (
        <Track key={i} track={t} />
    ));

    return (
        <table className="tracklist">
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default Tracklist;
