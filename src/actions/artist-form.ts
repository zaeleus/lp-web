import * as Redux from "redux";

import { IArtist } from "../models/Artist";

export enum ActionTypes {
    Reset = "LP/ARTIST_FORM/RESET",
    SetArtist = "LP/ARTIST_FORM/SET_ARTIST",
}

export interface IResetAction extends Redux.Action {
    type: ActionTypes.Reset;
}

export interface ISetArtistAction extends Redux.Action {
    artist: IArtist;
    type: ActionTypes.SetArtist;
}

export type Action = IResetAction | ISetArtistAction;

const setArtist: Redux.ActionCreator<ISetArtistAction> = (artist: IArtist) => ({
    artist,
    type: ActionTypes.SetArtist,
});

const reset: Redux.ActionCreator<IResetAction> = () => ({
    type: ActionTypes.Reset,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    reset,
    setArtist,
};

export default actionCreators;
