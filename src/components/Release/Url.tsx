import * as React from "react";

import { IReleaseUrl } from "../../models/ReleaseUrl";

interface IProps {
    url: IReleaseUrl;
}

const Url: React.StatelessComponent<IProps> = ({ url }) => {
    return <li><a href={url.url}>{url.name}</a></li>;
};

export default Url;
