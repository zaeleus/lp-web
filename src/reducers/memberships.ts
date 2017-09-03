import { Reducer } from "redux";

import {
    ActionTypes as ArtistFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-form";
import {
    Action,
    ActionTypes,
    IRemoveMembershipAction,
    ISetEndedOnAction,
    ISetStartedOnAction,
} from "../actions/memberships";

export interface IMembershipState {
    readonly id: string;
    readonly artistCreditId: string;
    readonly startedOn: string;
    readonly endedOn: string;
}

export interface IMembershipsState {
    readonly [id: string]: IMembershipState;
}

const initialState: IMembershipsState = {};

const removeMembership = (state: IMembershipsState, action: IRemoveMembershipAction): IMembershipsState => {
    const memberships: any = { ...state };
    delete memberships[action.id];
    return memberships;
};

const setEndedOn = (state: IMembershipsState, action: ISetEndedOnAction): IMembershipsState => ({
    ...state,
    [action.id]: {
        ...state[action.id],
        endedOn: action.endedOn,
    },
});

const setStartedOn = (state: IMembershipsState, action: ISetStartedOnAction): IMembershipsState => ({
    ...state,
    [action.id]: {
        ...state[action.id],
        startedOn: action.startedOn,
    },
});

const setArtist = (state: IMembershipsState, action: ISetArtistAction): IMembershipsState => {
    for (const membership of action.artist.memberships) {
        state = {
            ...state,
            [membership.id]: {
                artistCreditId: membership.artistCredit.id,
                endedOn: membership.endedOn,
                id: membership.id,
                startedOn: membership.startedOn,
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
        case ActionTypes.RemoveMembership: return removeMembership(state, action);
        case ActionTypes.SetEndedOn: return setEndedOn(state, action);
        case ActionTypes.SetStartedOn: return setStartedOn(state, action);

        case ArtistFormActionTypes.SetArtist: return setArtist(state, action);

        default: return state;
    }
};

export default reducer;
