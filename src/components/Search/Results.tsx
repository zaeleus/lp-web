import * as React from "react";

import { IAlbum } from "../../models/Album";
import { IArtist } from "../../models/Artist";
import { ISong } from "../../models/Song";
import Link from "../Link";
import Name from "../Name";

import "./Results.css";

interface IProps {
    albums: IAlbum[];
    artists: IArtist[];
    songs: ISong[];
}

const Results: React.StatelessComponent<IProps> = ({ albums, artists, songs }) => {
    const artistItems = artists.map((a: IArtist, i: number) => {
        return (
            <li key={i}>
                <Link to="artist" params={{ id: a.id }}>
                    <Name names={a.names} />
                </Link>
            </li>
        );
    });

    const albumItems = albums.map((a: IAlbum, i: number) => {
        return (
            <li key={i}>
                [{a.defaultRelease.releasedOn}]{" "}
                <Link to="release" params={{ id: a.defaultRelease.id }}>
                    <Name names={a.names} />
                </Link>
            </li>
        );
    });

    const songItems = songs.map((s: ISong, i: number) => {
        return (
            <li key={i}>
                <Link to="song" params={{ id: s.id }}>
                    <Name names={s.names} />
                </Link>
            </li>
        );
    });

    return (
        <div className="search-results">
            <div>
                <h3>Artists</h3>
                <ul>{artistItems}</ul>
            </div>
            <div>
                <h3>Albums</h3>
                <ul>{albumItems}</ul>
            </div>
            <div>
                <h3>Songs</h3>
                <ul>{songItems}</ul>
            </div>
        </div>
    );
};

export default Results;
