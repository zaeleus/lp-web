import * as React from "react";

import { IAlbum } from "../../queries/GetCalendar";
import MonthlyAlbum from "./MonthlyAlbum";

import "./MonthlyAlbums.css";

interface IProps {
    albums: IAlbum[];
}

const MonthlyAlbums: React.StatelessComponent<IProps> = ({ albums }) => {
    const items = albums.map((a, i) => (
        <MonthlyAlbum key={i} album={a} />
    ));

    return <ul className="monthly-albums">{items}</ul>;
};

export default MonthlyAlbums;
