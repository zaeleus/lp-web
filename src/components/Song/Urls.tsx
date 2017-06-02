import * as React from "react";

import { ISongUrl } from "../../models/SongUrl";

interface IProps {
    urls: ISongUrl[];
}

const Urls: React.StatelessComponent<IProps> = ({ urls }) => {
    const items = urls.map((u: ISongUrl) => (
        <li><a href={u.url}>{u.name}</a></li>
    ));

    return <ul>{items}</ul>;
};

export default Urls;
