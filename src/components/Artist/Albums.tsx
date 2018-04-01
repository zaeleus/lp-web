import * as React from "react";

import { IAlbum } from "../../queries/artist/FindArtist";
import Album from "./Album";

import "./Albums.css";

interface IProps {
    albums: IAlbum[];
}

const Albums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a, i) => <Album key={i} album={a} />);
    return <ul className="artist-albums">{items}</ul>;
};

export default Albums;
