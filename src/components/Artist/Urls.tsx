import * as React from "react";

import { IArtistUrl } from "../../models/ArtistUrl";
import Url from "./Url";

interface IProps {
    urls: IArtistUrl[];
}

const Urls: React.StatelessComponent<IProps> = ({ urls }) => {
    const items = urls.map((u, i) => <Url key={i} url={u} />);
    return <ul>{items}</ul>;
};

export default Urls;
