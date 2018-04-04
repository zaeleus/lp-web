import * as React from "react";

import { ISongUrl } from "../../queries/FindSong";

interface IProps {
    urls: ISongUrl[];
}

const Urls: React.StatelessComponent<IProps> = ({ urls }) => {
    const items = urls.map((u, i) => (
        <li key={i}><a href={u.url}>{u.name}</a></li>
    ));

    return <ul>{items}</ul>;
};

export default Urls;
