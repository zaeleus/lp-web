import * as Redux from "redux";

import { ISetArtistAction } from "./artist-form";

export enum ActionTypes {
    AddName = "LP/ARTIST_FORM/ARTIST_NAMES/ADD_NAME",
    RemoveName = "LP/ARTIST_FORM/ARTIST_NAMES/REMOVE_NAME",
    SetIsDefault = "LP/ARTIST_FORM/ARTIST_NAMES/SET_IS_DEFAULT",
    SetIsOriginal = "LP/ARTIST_FORM/ARTIST_NAMES/SET_IS_ORIGINAL",
    SetLocale = "LP/ARTIST_FORM/ARTIST_NAMES/SET_LOCALE",
    SetName = "LP/ARTIST_FORM/ARTIST_NAMES/SET_NAME",
}

export interface IAddNameAction extends Redux.Action {
    id: string;
    type: ActionTypes.AddName;
}

export interface IRemoveNameAction extends Redux.Action {
    id: string;
    type: ActionTypes.RemoveName;
}

export interface ISetIsDefaultAction extends Redux.Action {
    id: string;
    isDefault: boolean;
    type: ActionTypes.SetIsDefault;
}

export interface ISetIsOriginalAction extends Redux.Action {
    id: string;
    isOriginal: boolean;
    type: ActionTypes.SetIsOriginal;
}

export interface ISetLocaleAction extends Redux.Action {
    id: string;
    locale: string;
    type: ActionTypes.SetLocale;
}

export interface ISetNameAction extends Redux.Action {
    id: string;
    name: string;
    type: ActionTypes.SetName;
}

export type Action =
    IAddNameAction |
    IRemoveNameAction |
    ISetArtistAction |
    ISetIsDefaultAction |
    ISetIsOriginalAction |
    ISetLocaleAction |
    ISetNameAction;

let artistNameIdSequence = -1;
const nextArtistCreditId = (): string => {
    return (--artistNameIdSequence).toString();
};

const addName: Redux.ActionCreator<IAddNameAction> = () => ({
    id: nextArtistCreditId(),
    type: ActionTypes.AddName,
});

const removeName: Redux.ActionCreator<IRemoveNameAction> = (id: string) => ({
    id,
    type: ActionTypes.RemoveName,
});

const setIsDefault: Redux.ActionCreator<ISetIsDefaultAction> = (id: string, isDefault: boolean) => ({
    id,
    isDefault,
    type: ActionTypes.SetIsDefault,
});

const setIsOriginal: Redux.ActionCreator<ISetIsOriginalAction> = (id: string, isOriginal: boolean) => ({
    id,
    isOriginal,
    type: ActionTypes.SetIsOriginal,
});

const setLocale: Redux.ActionCreator<ISetLocaleAction> = (id: string, locale: string) => ({
    id,
    locale,
    type: ActionTypes.SetLocale,
});

const setName: Redux.ActionCreator<ISetNameAction> = (id: string, name: string) => ({
    id,
    name,
    type: ActionTypes.SetName,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    addName,
    removeName,
    setIsDefault,
    setIsOriginal,
    setLocale,
    setName,
};

export default actionCreators;
