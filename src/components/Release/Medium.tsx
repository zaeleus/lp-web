import * as React from "react";

import { IMedium } from "../../queries/release/FindRelease";
import Alert from "../Alert";
import Tracklist from "./Tracklist";

interface IProps {
    medium: IMedium;
}

const Media: React.StatelessComponent<IProps> = ({ medium }) => {
    const tracklist = (medium.tracks.length === 0)
        ? <Alert>No tracks.</Alert>
        : <Tracklist tracks={medium.tracks} />;

    return (
        <div>
            <h4>{medium.kind} {medium.position}</h4>
            {tracklist}
        </div>
    );
};

export default Media;
