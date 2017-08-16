import * as Redux from "redux";

import { IArtist } from "../models/Artist";

export enum ActionTypes {
    AddName = "LP/ARTIST_FORM/ADD_NAME",
    RemoveName = "LP/ARTIST_FORM/REMOVE_NAME",
    Reset = "LP/ARTIST_FORM/RESET",
    SetArtist = "LP/ARTIST_FORM/SET_ARTIST",
    SetEndedOn = "LP/ARTIST_FORM/SET_ENDED_ON",
    SetKind = "LP/ARTIST_FORM/SET_KIND",
    SetNameIsDefault = "LP/ARTIST_FORM/NAME/SET_IS_DEFAULT",
    SetNameIsOriginal = "LP/ARTIST_FORM/NAME/SET_IS_ORIGINAL",
    SetNameLocale = "LP/ARTIST_FORM/NAME/SET_LOCALE",
    SetNameName = "LP/ARTIST_FORM/NAME/SET_NAME",
    SetStartedOn = "LP/ARTIST_FORM/SET_STARTED_ON",
}

interface IAddNameAction extends Redux.Action {
    type: ActionTypes.AddName;
}

interface IRemoveNameAction extends Redux.Action {
    id: string;
    type: ActionTypes.RemoveName;
}

interface IResetAction extends Redux.Action {
    type: ActionTypes.Reset;
}

export interface ISetArtistAction extends Redux.Action {
    artist: IArtist;
    type: ActionTypes.SetArtist;
}

interface ISetEndedOnAction extends Redux.Action {
    endedOn: string;
    type: ActionTypes.SetEndedOn;
}

interface ISetKindAction extends Redux.Action {
    kind: string;
    type: ActionTypes.SetKind;
}

interface ISetNameIsDefaultAction extends Redux.Action {
    id: string;
    isDefault: boolean;
    type: ActionTypes.SetNameIsDefault;
}

interface ISetNameIsOriginalAction extends Redux.Action {
    id: string;
    isOriginal: boolean;
    type: ActionTypes.SetNameIsOriginal;
}

interface ISetNameNameAction extends Redux.Action {
    id: string;
    name: string;
    type: ActionTypes.SetNameName;
}

interface ISetNameLocaleAction extends Redux.Action {
    id: string;
    locale: string;
    type: ActionTypes.SetNameLocale;
}

interface ISetStartedOnAction extends Redux.Action {
    startedOn: string;
    type: ActionTypes.SetStartedOn;
}

export type Action =
    IAddNameAction |
    IRemoveNameAction |
    IResetAction |
    ISetArtistAction |
    ISetKindAction |
    ISetNameIsDefaultAction |
    ISetNameIsOriginalAction |
    ISetNameLocaleAction |
    ISetNameNameAction |
    ISetStartedOnAction |
    ISetEndedOnAction;

const addName: Redux.ActionCreator<IAddNameAction> = () => ({
    type: ActionTypes.AddName,
});

const removeName: Redux.ActionCreator<IRemoveNameAction> = (id: string) => ({
    id,
    type: ActionTypes.RemoveName,
});

const setArtist: Redux.ActionCreator<ISetArtistAction> = (artist: IArtist) => ({
    artist,
    type: ActionTypes.SetArtist,
});

const setEndedOn: Redux.ActionCreator<ISetEndedOnAction> = (endedOn: string) => ({
    endedOn,
    type: ActionTypes.SetEndedOn,
});

const setKind: Redux.ActionCreator<ISetKindAction> = (kind: string) => ({
    kind,
    type: ActionTypes.SetKind,
});

const setNameIsDefault: Redux.ActionCreator<ISetNameIsDefaultAction> = (id: string, isDefault: boolean) => ({
    id,
    isDefault,
    type: ActionTypes.SetNameIsDefault,
});

const setNameIsOriginal: Redux.ActionCreator<ISetNameIsOriginalAction> = (id: string, isOriginal: boolean) => ({
    id,
    isOriginal,
    type: ActionTypes.SetNameIsOriginal,
});

const setNameLocale: Redux.ActionCreator<ISetNameLocaleAction> = (id: string, locale: string) => ({
    id,
    locale,
    type: ActionTypes.SetNameLocale,
});

const setNameName: Redux.ActionCreator<ISetNameNameAction> = (id: string, name: string) => ({
    id,
    name,
    type: ActionTypes.SetNameName,
});

const setStartedOn: Redux.ActionCreator<ISetStartedOnAction> = (startedOn: string) => ({
    startedOn,
    type: ActionTypes.SetStartedOn,
});

const reset: Redux.ActionCreator<IResetAction> = () => ({
    type: ActionTypes.Reset,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    addName,
    removeName,
    reset,
    setArtist,
    setEndedOn,
    setKind,
    setNameIsDefault,
    setNameIsOriginal,
    setNameLocale,
    setNameName,
    setStartedOn,
};

export default actionCreators;
