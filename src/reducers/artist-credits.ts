import { Reducer } from "redux";

import { Action } from "../actions/artist-credits";
import {
    ActionTypes as ArtistFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-form";

export interface IArtistCreditState {
    readonly id: string;
    readonly nameIds: string[];
}

export interface IArtistCreditsState {
    readonly [id: string]: IArtistCreditState;
}

const setArtist = (state: IArtistCreditsState, action: ISetArtistAction): IArtistCreditsState => {
    for (const membership of action.artist.memberships) {
        const artistCredit = membership.artistCredit;

        state = {
            ...state,
            [artistCredit.id]: {
                id: artistCredit.id,
                nameIds: artistCredit.names.map((n) => n.id),
            },
        };
    }

    return state;
};

const initialState: IArtistCreditsState = {};

const reducer: Reducer<IArtistCreditsState> = (
    state: IArtistCreditsState = initialState,
    action: Action,
) => {
    switch (action.type) {
        case ArtistFormActionTypes.SetArtist: return setArtist(state, action);
        default: return state;
    }
};

export default reducer;
