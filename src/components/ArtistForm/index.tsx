import * as React from "react";

import { IArtist } from "../../models/Artist";
import Names from "./Names";

import "./index.css";

interface IProps {
    artist: IArtist;
    onSubmit: any;
}

interface IArtistState {
    id: string;

    country: string;
    disambiguation: string;
    endedOn: string;
    kind: string;
    startedOn: string;
}

export interface IArtistNameState {
    id: string;

    _delete: boolean;

    name: string;
    locale: string;
    isDefault: boolean;
    isOriginal: boolean;
}

interface IState {
    artist: IArtistState;
    names: IArtistNameState[];
}

class ArtistForm extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);

        const { artist } = this.props;

        const names = artist.names.map((name) => ({
            id: name.id,

            _delete: false,

            isDefault: name.isDefault,
            isOriginal: name.isOriginal,
            locale: name.locale,
            name: name.name,
        }));

        this.state = {
            artist: {
                id: artist.id,

                country: artist.country,
                disambiguation: artist.disambiguation,
                endedOn: artist.endedOn,
                kind: artist.kind,
                startedOn: artist.startedOn,
            },
            names,
        };
    }

    public render() {
        const { artist, names } = this.state;

        return (
            <form className="artist-form" onSubmit={this.onSubmit}>
                <div className="group">
                    <label>Names <a href="#" onClick={this.addName}>[+]</a></label>
                    <Names
                        names={names}
                        onNameNameChange={this.onNameNameChange}
                        onNameLocaleChange={this.onNameLocaleChange}
                        onNameIsOriginalChange={this.onNameIsOriginalChange}
                        onNameIsDefaultChange={this.onNameIsDefaultChange}
                        removeName={this.removeName}
                    />
                </div>

                <div className="group">
                    <label>Kind</label>
                    <select value={artist.kind} onChange={this.onKindChange}>
                        <option value="PERSON">person</option>
                        <option value="GROUP">group</option>
                    </select>
                </div>

                <div className="group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={artist.country}
                        onChange={this.onCountryChange}
                    />
                </div>

                <div className="dates group">
                    <div className="started-on">
                        <label>Started On</label>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={artist.startedOn || ""}
                            onChange={this.onStartedOnChange}
                        />
                    </div>

                    <div className="ended-on">
                        <label>Ended On</label>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={artist.endedOn || ""}
                            onChange={this.onEndedOnChange}
                        />
                    </div>
                </div>

                <div className="group">
                    <label>Disambiguation</label>
                    <input
                        type="text"
                        value={artist.disambiguation || ""}
                        onChange={this.onDisambiguationChange}
                    />
                </div>

                <div className="group">
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }

    private addName = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const name = {
            id: "",

            _delete: false,

            isDefault: false,
            isOriginal: false,
            locale: "",
            name: "",
        };

        this.setState((prevState) => ({ names: [...prevState.names, name] }));
    }

    private removeName = (i: number) => {
        this.setName(i, { ...this.state.names[i], _delete: true });
    }

    private setName = (i: number, name: IArtistNameState) => {
        this.setState((prevState) => ({
            ...prevState,
            names: prevState.names.map((prevName, j) => (
                (i === j) ? name : prevName
            )),
        }));
    }

    private onNameNameChange = (i: number, name: string) => {
        this.setName(i, { ...this.state.names[i], name });
    }

    private onNameLocaleChange = (i: number, locale: string) => {
        this.setName(i, { ...this.state.names[i], locale });
    }

    private onNameIsOriginalChange = (i: number, isOriginal: boolean) => {
        this.setState((prevState) => ({
            ...prevState,
            names: prevState.names.map((prevName, j) => ({
                ...prevName,
                isOriginal: i === j,
            })),
        }));
    }

    private onNameIsDefaultChange = (i: number, isDefault: boolean) => {
        this.setState((prevState) => ({
            ...prevState,
            names: prevState.names.map((prevName, j) => ({
                ...prevName,
                isDefault: i === j,
            })),
        }));
    }

    private onCountryChange = (event: React.FormEvent<HTMLInputElement>) => {
        const country = event.currentTarget.value;

        this.setState((prevState) => ({
            artist: { ...prevState.artist, country },
        }));
    }

    private onDisambiguationChange = (event: React.FormEvent<HTMLInputElement>) => {
        const disambiguation = event.currentTarget.value;

        this.setState((prevState) => ({
            artist: { ...prevState.artist, disambiguation },
        }));
    }

    private onEndedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const endedOn = event.currentTarget.value;

        this.setState((prevState) => ({
            artist: { ...prevState.artist, endedOn },
        }));
    }

    private onKindChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const kind = event.currentTarget.value;

        this.setState((prevState) => ({
            artist: { ...prevState.artist, kind },
        }));
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const startedOn = event.currentTarget.value;

        this.setState((prevState) => ({
            artist: { ...prevState.artist, startedOn },
        }));
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { artist, names } = this.state;

        const payload = {
            variables: {
                input: {
                    country: artist.country,
                    disambiguation: artist.disambiguation,
                    endedOn: artist.endedOn,
                    id: artist.id,
                    kind: artist.kind,
                    startedOn: artist.startedOn,

                    names,
                },
            },
        };

        // tslint:disable-next-line:no-console
        console.log(payload);

        // this.props.onSubmit(payload);
    }
}

export default ArtistForm;
