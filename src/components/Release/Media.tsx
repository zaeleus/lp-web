import * as React from "react";

import { IMedium } from "../../queries/release/FindRelease";
import Medium from "./Medium";

interface IProps {
    media: IMedium[];
}

const Media: React.StatelessComponent<IProps> = ({ media }) => {
    const items = media.map((m, i) => <Medium key={i} medium={m} />);
    return <div>{items}</div>;
};

export default Media;
