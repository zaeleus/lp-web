import * as React from "react";

import { IMedium } from "../models/Medium";
import Alert from "./Alert";
import Tracklist from "./Tracklist";

interface IProps {
    medium: IMedium;
}

const Media: React.StatelessComponent<IProps> = ({ medium }) => {
    let tracklist;

    if (medium.tracks.length === 0) {
        tracklist = <Alert>No tracks.</Alert>;
    } else {
        tracklist = <Tracklist tracks={medium.tracks} />;
    }

    return (
        <div>
            <h4>{medium.kind} {medium.position}</h4>
            {tracklist}
        </div>
    );
};

export default Media;
