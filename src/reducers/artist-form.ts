import { combineReducers } from "redux";

import artistReducer, { IArtistState } from "./artist";
import artistCreditNamesReducer, { IArtistCreditNamesState } from "./artist-credit-names";
import artistCreditsReducer, { IArtistCreditsState } from "./artist-credits";
import artistNamesReducer, { IArtistNamesState } from "./artist-names";
import membershipsReducer, { IMembershipsState } from "./memberships";

export interface IArtistFormState {
    readonly artist: IArtistState;
    readonly artistCredits: IArtistCreditsState;
    readonly artistCreditNames: IArtistCreditNamesState;
    readonly artistNames: IArtistNamesState;
    readonly memberships: IMembershipsState;
}

export default combineReducers({
    artist: artistReducer,
    artistCreditNames: artistCreditNamesReducer,
    artistCredits: artistCreditsReducer,
    artistNames: artistNamesReducer,
    memberships: membershipsReducer,
});
