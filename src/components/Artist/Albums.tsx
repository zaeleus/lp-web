import * as React from "react";

import { IAlbum } from "../../models/Album";
import Album from "./Album";

interface IProps {
    albums: IAlbum[];
}

const Albums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a: IAlbum, i: number) => (
        <Album key={i} album={a} />
    ));

    return <ul>{items}</ul>;
};

export default Albums;
