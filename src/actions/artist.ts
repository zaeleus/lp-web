import * as Redux from "redux";

import { ISetArtistAction } from "./artist-form";
import { IAddNameAction, IRemoveNameAction } from "./artist-names";
import { IRemoveMembershipAction } from "./memberships";

export enum ActionTypes {
    SetCountry = "LP/ARTIST_FORM/ARTIST/SET_COUNTRY",
    SetEndedOn = "LP/ARTIST_FORM/ARTIST/SET_ENDED_ON",
    SetKind = "LP/ARTIST_FORM/ARTIST/SET_KIND",
    SetStartedOn = "LP/ARTIST_FORM/ARTIST/SET_STARTED_ON",
}

export interface ISetCountryAction extends Redux.Action {
    country: string;
    type: ActionTypes.SetCountry;
}

export interface ISetEndedOnAction extends Redux.Action {
    endedOn: string;
    type: ActionTypes.SetEndedOn;
}

export interface ISetKindAction extends Redux.Action {
    kind: string;
    type: ActionTypes.SetKind;
}

export interface ISetStartedOnAction extends Redux.Action {
    startedOn: string;
    type: ActionTypes.SetStartedOn;
}

export type Action =
    IAddNameAction |
    IRemoveMembershipAction |
    IRemoveNameAction |
    ISetArtistAction |
    ISetCountryAction |
    ISetKindAction |
    ISetStartedOnAction |
    ISetEndedOnAction;

const setCountry: Redux.ActionCreator<ISetCountryAction> = (country: string) => ({
    country,
    type: ActionTypes.SetCountry,
});

const setEndedOn: Redux.ActionCreator<ISetEndedOnAction> = (endedOn: string) => ({
    endedOn,
    type: ActionTypes.SetEndedOn,
});

const setKind: Redux.ActionCreator<ISetKindAction> = (kind: string) => ({
    kind,
    type: ActionTypes.SetKind,
});

const setStartedOn: Redux.ActionCreator<ISetStartedOnAction> = (startedOn: string) => ({
    startedOn,
    type: ActionTypes.SetStartedOn,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    setCountry,
    setEndedOn,
    setKind,
    setStartedOn,
};

export default actionCreators;
