import * as React from "react";

import { ISong } from "../../models/Song";
import Name from "../Name";

interface IProps {
    song: ISong;
}

const Header: React.StatelessComponent<IProps> = ({ song }) => (
    <header className="song">
        <h2>
            <div><Name names={song.names} /></div>
            <div><Name names={song.names} original={true} /></div>
        </h2>
    </header>
);

export default Header;
