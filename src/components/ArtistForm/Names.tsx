import * as React from "react";

import NameInput from "./NameInput";

import "./Names.css";

interface IProps {
    nameIds: string[];
}

const Names: React.StatelessComponent<IProps> = ({ nameIds }) => {
    const names = nameIds.map((id, i) => <NameInput key={i} id={id} />);

    return (
        <table className="names">
            <thead>
                <tr>
                    <th className="name"><label>Name</label></th>
                    <th className="locale"><label>Locale</label></th>
                    <th className="is-original"><label>Original</label></th>
                    <th className="is-default"><label>Default</label></th>
                    <th className="actions"><label>Actions</label></th>
                </tr>
            </thead>
            <tbody>
                {names}
            </tbody>
        </table>
    );
};

export default Names;
