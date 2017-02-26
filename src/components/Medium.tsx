import * as React from "react";

import { IMedium } from "../models/Medium";
import Alert from "./Alert";
import Tracklist from "./Tracklist";

interface IProps {
    medium: IMedium;
}

const Media: React.StatelessComponent<IProps> = ({ medium }) => {
    if (medium.tracks.length === 0) {
        return <Alert>No tracks.</Alert>;
    } else {
        return <Tracklist tracks={medium.tracks} />;
    }
};

export default Media;
