import * as React from "react";

import { IMedium } from "../../models/Medium";

interface IProps {
    media: IMedium[];
}

const Format: React.StatelessComponent<IProps> = ({ media }) => (
    <span>{media.map((m) => m.kind).join("+")}</span>
);

export default Format;
