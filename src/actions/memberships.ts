import * as Redux from "redux";

import { ISetArtistAction } from "./artist-form";

export enum ActionTypes {
    SetStartedOn = "LP/ARTIST_FORM/MEMBERSHIPS/SET_STARTED_ON",
    SetEndedOn = "LP/ARTIST_FORM/MEMBERSHIPS/SET_ENDED_ON",
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

export type Action = ISetArtistAction | ISetEndedOnAction | ISetStartedOnAction;

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
    setEndedOn,
    setStartedOn,
};

export default actionCreators;
