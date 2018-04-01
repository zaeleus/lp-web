import * as React from "react";

export interface IArtistUrl {
    url: string;
    name: string;
}

interface IProps {
    url: IArtistUrl;
}

const Url: React.StatelessComponent<IProps> = ({ url }) => {
    return <li><a href={url.url}>{url.name}</a></li>;
};

export default Url;
