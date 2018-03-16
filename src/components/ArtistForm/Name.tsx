import * as React from "react";

import { IArtistNameState } from "./index";

export interface IProps {
    id: number;
    name: IArtistNameState;
    onNameChange(i: number, name: string): void;
    onLocaleChange(i: number, locale: string): void;
    onIsOriginalChange(i: number, isOriginal: boolean): void;
    onIsDefaultChange(i: number, isDefault: boolean): void;
    removeName(i: number): void;
}

class Name extends React.Component<IProps> {
    public render() {
        const { name } = this.props;

        return (
            <tr>
                <td className="name">
                    <input
                        type="text"
                        value={name.name}
                        onChange={this.onNameChange}
                    />
                </td>
                <td className="locale">
                    <input
                        type="text"
                        placeholder="und"
                        value={name.locale}
                        onChange={this.onLocaleChange}
                    />
                </td>
                <td className="is-original">
                    <input
                        type="radio"
                        checked={name.isOriginal}
                        onChange={this.onIsOriginalChange}
                    />
                </td>
                <td className="is-default">
                    <input
                        type="radio"
                        checked={name.isDefault}
                        onChange={this.onIsDefaultChange}
                    />
                </td>
                <td className="actions">
                    <a href="#" onClick={this.onRemoveClick}>[x]</a>
                </td>
            </tr>
        );
    }

    private onIsDefaultChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onIsDefaultChange(this.props.id, event.currentTarget.checked);
    }

    private onIsOriginalChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onIsOriginalChange(this.props.id, event.currentTarget.checked);
    }

    private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onNameChange(this.props.id, event.currentTarget.value);
    }

    private onLocaleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onLocaleChange(this.props.id, event.currentTarget.value);
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.props.removeName(this.props.id);
    }
}

export default Name;
