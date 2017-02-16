import * as React from "react";

import { IAlbum } from "../../models/Album";
import * as Nameable from "../../models/Nameable";

interface IProps {
    album: IAlbum;
}

const Album: React.StatelessComponent<IProps> = ({ album }) => {
    return <li>{Nameable.defaultName(album.names)}</li>;
};

export default Album;
