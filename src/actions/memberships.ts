import * as Redux from "redux";

import { ISetArtistAction } from "./artist-form";

export enum ActionTypes {
    RemoveMembership = "LP/ARTIST_FORM/MEMBERSHIPS/REMOVE_MEMBERSHIP",
    SetStartedOn = "LP/ARTIST_FORM/MEMBERSHIPS/SET_STARTED_ON",
    SetEndedOn = "LP/ARTIST_FORM/MEMBERSHIPS/SET_ENDED_ON",
}

export interface IRemoveMembershipAction extends Redux.Action {
    id: string;
    type: ActionTypes.RemoveMembership;
}

export interface ISetStartedOnAction extends Redux.Action {
    id: string;
    startedOn: string;
    type: ActionTypes.SetStartedOn;
}

export interface ISetEndedOnAction extends Redux.Action {
    endedOn: string;
    id: string;
    type: ActionTypes.SetEndedOn;
}

export type Action =
    IRemoveMembershipAction |
    ISetArtistAction |
    ISetEndedOnAction |
    ISetStartedOnAction;

const removeMembership: Redux.ActionCreator<IRemoveMembershipAction> = (id: string) => ({
    id,
    type: ActionTypes.RemoveMembership,
});

const setEndedOn: Redux.ActionCreator<ISetEndedOnAction> = (id: string, endedOn: string) => ({
    endedOn,
    id,
    type: ActionTypes.SetEndedOn,
});

const setStartedOn: Redux.ActionCreator<ISetStartedOnAction> = (id: string, startedOn: string) => ({
    id,
    startedOn,
    type: ActionTypes.SetStartedOn,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    removeMembership,
    setEndedOn,
    setStartedOn,
};

export default actionCreators;
