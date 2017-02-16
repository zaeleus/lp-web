import * as React from "react";

import { IAlbum } from "../models/Album";
import MonthlyAlbum from "./MonthlyAlbum";

interface IProps {
    albums: IAlbum[];
}

const MonthlyAlbums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a: IAlbum, i: number) => (
        <MonthlyAlbum key={i} album={a} />
    ));

    return <ul>{items}</ul>;
};

export default MonthlyAlbums;
