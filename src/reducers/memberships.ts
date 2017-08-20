import { Reducer } from "redux";

import {
    ActionTypes as ArtistFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-form";
import { Action } from "../actions/memberships";

export interface IMembershipState {
    readonly id: string;
    readonly artistCreditId: string;
}

export interface IMembershipsState {
    readonly [id: string]: IMembershipState;
}

const initialState: IMembershipsState = {};

const setArtist = (state: IMembershipsState, action: ISetArtistAction): IMembershipsState => {
    for (const membership of action.artist.memberships) {
        state = {
            ...state,
            [membership.id]: {
                artistCreditId: membership.artistCredit.id,
                id: membership.id,
            },
        };
    }

    return state;
};

const reducer: Reducer<IMembershipsState> = (
    state: IMembershipsState = initialState,
    action: Action,
) => {
    switch (action.type) {
        case ArtistFormActionTypes.SetArtist: return setArtist(state, action);
        default: return state;
    }
};

export default reducer;
