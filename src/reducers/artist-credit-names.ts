import { Reducer } from "redux";

import { Action } from "../actions/artist-credit-names";
import {
    ActionTypes as ArtistMembershipsFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-memberships-form";

export interface IArtistCreditNameState {
    readonly id: string;
    readonly name: string;
    readonly locale: string;
    readonly isDefault: boolean;
    readonly isOriginal: boolean;
}

export interface IArtistCreditNamesState {
    readonly [id: string]: IArtistCreditNameState;
}

const setArtist = (state: IArtistCreditNamesState, action: ISetArtistAction): IArtistCreditNamesState => {
    for (const membership of action.artist.memberships) {
        for (const name of membership.artistCredit.names) {
            state = {
                ...state,
                [name.id]: {
                    id: name.id,
                    isDefault: name.isDefault,
                    isOriginal: name.isOriginal,
                    locale: name.locale,
                    name: name.name,
                },
            };
        }
    }

    return state;
};

const initialState: IArtistCreditNamesState = {};

const reducer: Reducer<IArtistCreditNamesState> = (
    state: IArtistCreditNamesState = initialState,
    action: Action,
) => {
    switch (action.type) {
        case ArtistMembershipsFormActionTypes.SetArtist: return setArtist(state, action);
        default: return state;
    }
};

export default reducer;
