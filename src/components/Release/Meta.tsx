import * as React from "react";

import { IRelease } from "../../queries/release/FindRelease";
import Format from "./Format";

import "./Meta.css";

interface IProps {
    release: IRelease;
}

const Meta: React.StatelessComponent<IProps> = ({ release }) => {
    const catalogNumber = release.catalogNumber || "—";
    const disambiguation = release.disambiguation || "—";

    return (
        <div className="meta alert">
            <div>
                <dt>Kind</dt>
                <dd>{release.album.kind}</dd>
            </div>
            <div>
                <dt>Release Date</dt>
                <dd>[{release.country}] {release.releasedOn}</dd>
            </div>
            <div>
                <dt>Format</dt>
                <dd><Format media={release.media} /></dd>
            </div>
            <div>
                <dt>Catalog Number</dt>
                <dd>{catalogNumber}</dd>
            </div>
            <div>
                <dt>Disambiguation</dt>
                <dd>{disambiguation}</dd>
            </div>
        </div>
    );
};

export default Meta;
