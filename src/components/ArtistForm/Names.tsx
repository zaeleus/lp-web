import * as React from "react";

import NameInput from "./NameInput";

import "./Names.css";

interface IProps {
    ids: string[];
}

const Names: React.StatelessComponent<IProps> = ({ ids }) => {
    const names = ids.map((id, i) => (
        <NameInput key={i} id={id} />
    ));

    return (
        <table className="names">
            <thead>
                <tr>
                    <th className="name"><label>Name</label></th>
                    <th className="locale"><label>Locale</label></th>
                    <th className="is-original"><label>Original</label></th>
                    <th className="is-default"><label>Default</label></th>
                </tr>
            </thead>
            <tbody>
                {names}
            </tbody>
        </table>
    );
};

export default Names;