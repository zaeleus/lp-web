import { combineReducers } from "redux";

import artistReducer, { IArtistState } from "./artist";
import artistNamesReducer, { IArtistNamesState } from "./artist-names";

export interface IArtistFormState {
    readonly artist: IArtistState;
    readonly artistNames: IArtistNamesState;
}

export default combineReducers({
    artist: artistReducer,
    artistNames: artistNamesReducer,
});
