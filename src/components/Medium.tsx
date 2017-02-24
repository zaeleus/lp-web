import * as React from "react";

import { IMedium } from "../models/Medium";
import Tracklist from "./Tracklist";

interface IProps {
    medium: IMedium;
}

const Media: React.StatelessComponent<IProps> = ({ medium }) => (
    <Tracklist tracks={medium.tracks} />
);

export default Media;
