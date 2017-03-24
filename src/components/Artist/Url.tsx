import * as React from "react";

import { IArtistUrl } from "../../models/ArtistUrl";

interface IProps {
    url: IArtistUrl;
}

const Url: React.StatelessComponent<IProps> = ({ url }) => {
    return <li><a href={url.url}>{url.name}</a></li>;
};

export default Url;
