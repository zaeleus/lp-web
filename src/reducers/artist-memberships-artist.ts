import { Reducer } from "redux";

import { Action } from "../actions/artist-memberships-artist";
import {
    ActionTypes as ArtistMembershipsFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-memberships-form";
import {
    ActionTypes as ArtistMembershipsActionTypes,
    IRemoveMembershipAction,
} from "../actions/memberships";

export interface IArtistMembershipsArtistState {
    readonly id: string;
    readonly membershipIds: string[];
}

const setArtist = (state: IArtistMembershipsArtistState, action: ISetArtistAction): IArtistMembershipsArtistState => {
    const { artist } = action;

    return {
        ...state,
        id: artist.id,
        membershipIds: artist.memberships.map((m) => m.id),
    };
};

const removeMembership = (
    state: IArtistMembershipsArtistState,
    action: IRemoveMembershipAction,
): IArtistMembershipsArtistState => {
    const i = state.membershipIds.indexOf(action.id);
    const ids = [...state.membershipIds.slice(0, i), ...state.membershipIds.slice(i + 1)];
    return { ...state, membershipIds: ids };
};

const initialState: IArtistMembershipsArtistState = {
    id: "0",
    membershipIds: [],
};

const reducer: Reducer<IArtistMembershipsArtistState> = (
    state: IArtistMembershipsArtistState = initialState,
    action: Action,
): IArtistMembershipsArtistState => {
    switch (action.type) {
        case ArtistMembershipsFormActionTypes.SetArtist: return setArtist(state, action);

        case ArtistMembershipsActionTypes.RemoveMembership: return removeMembership(state, action);

        default: return state;
    }
};

export default reducer;
