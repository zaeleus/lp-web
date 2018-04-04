import * as React from "react";

import { IReleaseUrl } from "../../queries/release/FindRelease";
import Url from "./Url";

interface IProps {
    urls: IReleaseUrl[];
}

const Urls: React.StatelessComponent<IProps> = ({ urls }) => {
    const items = urls.map((u, i) => <Url key={i} url={u} />);
    return <ul>{items}</ul>;
};

export default Urls;
