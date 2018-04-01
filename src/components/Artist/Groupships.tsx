import * as React from "react";

import { IGroupship } from "../../queries/artist/FindArtist";
import Groupship from "./Groupship";

interface IProps {
    groupships: IGroupship[];
}

const Groupships: React.StatelessComponent<IProps> = ({ groupships }) => {
    const items = groupships.map((m, i) => (
        <Groupship key={i} groupship={m} />
    ));

    return <ul>{items}</ul>;
};

export default Groupships;
