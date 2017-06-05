import * as React from "react";

import { IMedium } from "../../models/Medium";
import Medium from "./Medium";

interface IProps {
    media: IMedium[];
}

const Media: React.StatelessComponent<IProps> = ({ media }) => {
    const items = media.map((m: IMedium, i: number) => (
        <Medium key={i} medium={m} />
    ));

    return <div>{items}</div>;
};

export default Media;
