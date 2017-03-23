import * as React from "react";

import { IAlbum } from "../../models/Album";
import { IArtist } from "../../models/Artist";
import Link from "../Link";
import Name from "../Name";

import "./Results.css";

interface IProps {
    albums: IAlbum[];
    artists: IArtist[];
}

const Results: React.StatelessComponent<IProps> = ({ albums, artists }) => {
    const artistsItems = artists.map((a: IArtist, i: number) => {
        return (
            <li key={i}>
                <Link to="artist" params={{ id: a.id }}>
                    <Name names={a.names} />
                </Link>
            </li>
        );
    });

    const albumsItems = albums.map((a: IAlbum, i: number) => {
        return (
            <li key={i}>
                [{a.defaultRelease.releasedOn}]{" "}
                <Link to="artist" params={{ id: a.id }}>
                    <Name names={a.names} />
                </Link>
            </li>
        );
    });

    return (
        <div className="search-results">
            <div>
                <h3>Artists</h3>
                <ul>{artistsItems}</ul>
            </div>
            <div>
                <h3>Albums</h3>
                <ul>{albumsItems}</ul>  
            </div>
        </div>
    );
};

export default Results;
