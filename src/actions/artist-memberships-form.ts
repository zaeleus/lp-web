import * as Redux from "redux";

import { IArtist } from "../models/Artist";

export enum ActionTypes {
    SetArtist = "LP/ARTIST_MEMBERSHIPS_FORM/SET_ARTIST",
}

export interface ISetArtistAction extends Redux.Action {
    artist: IArtist;
    type: ActionTypes.SetArtist;
}

export type Action = ISetArtistAction;

const setArtist: Redux.ActionCreator<ISetArtistAction> = (artist: IArtist) => ({
    artist,
    type: ActionTypes.SetArtist,
});

const actionCreators: Redux.ActionCreatorsMapObject = {
    setArtist,
};

export default actionCreators;
