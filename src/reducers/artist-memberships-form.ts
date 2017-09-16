import { combineReducers } from "redux";

import artistCreditNamesReducer, { IArtistCreditNamesState } from "./artist-credit-names";
import artistCreditsReducer, { IArtistCreditsState } from "./artist-credits";
import artistMembershipsArtistReducer, { IArtistMembershipsArtistState } from "./artist-memberships-artist";
import membershipsReducer, { IMembershipsState } from "./memberships";

export interface IArtistMembershipsFormState {
    readonly artist: IArtistMembershipsArtistState;
    readonly artistCredits: IArtistCreditsState;
    readonly artistCreditNames: IArtistCreditNamesState;
    readonly memberships: IMembershipsState;
}

export default combineReducers({
    artist: artistMembershipsArtistReducer,
    artistCreditNames: artistCreditNamesReducer,
    artistCredits: artistCreditsReducer,
    memberships: membershipsReducer,
});
