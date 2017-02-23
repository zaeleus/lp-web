import * as React from "react";

import { IReleaseUrl } from "../../models/ReleaseUrl";
import Url from "./Url";

interface IProps {
    urls: IReleaseUrl[];
}

const Urls: React.StatelessComponent<IProps> = ({ urls }) => {
    const items = urls.map((u: IReleaseUrl, i: number) => (
        <Url key={i} url={u} />
    ));

    return <ul>{items}</ul>;
};

export default Urls;
