import * as React from "react";

import { IArtistNameState } from "./index";
import Name from "./Name";

import "./Names.css";

interface IProps {
    names: IArtistNameState[];
    onNameNameChange(i: number, name: string): void;
    onNameLocaleChange(i: number, locale: string): void;
    onNameIsOriginalChange(i: number, isOriginal: boolean): void;
    onNameIsDefaultChange(i: number, isDefault: boolean): void;
    removeName(i: number): void;
}

const Names: React.StatelessComponent<IProps> = (props) => {
    const rows = props.names
        .filter((name) => !name._delete)
        .map((name, i) => (
            <Name
                key={i}
                id={i}
                name={name}
                onNameChange={props.onNameNameChange}
                onLocaleChange={props.onNameLocaleChange}
                onIsOriginalChange={props.onNameIsOriginalChange}
                onIsDefaultChange={props.onNameIsDefaultChange}
                removeName={props.removeName}
            />
        ));

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
                {rows}
            </tbody>
        </table>
    );
};

export default Names;
