import { Reducer } from "redux";

import {
    Action,
    ActionTypes,
    ISetEndedOnAction,
    ISetKindAction,
    ISetStartedOnAction,
} from "../actions/artist";
import {
    ActionTypes as ArtistFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-form";
import {
    ActionTypes as ArtistNamesActionTypes,
    IAddNameAction,
    IRemoveNameAction,
} from "../actions/artist-names";

export interface IArtistState {
    readonly id: string;

    readonly endedOn: string;
    readonly kind: string;
    readonly startedOn: string;

    readonly nameIds: string[];
    readonly membershipIds: string[];
}

const addName = (state: IArtistState, action: IAddNameAction): IArtistState => {
    return { ...state, nameIds: [...state.nameIds, action.id] };
};

const removeName = (state: IArtistState, action: IRemoveNameAction): IArtistState => {
    const i = state.nameIds.indexOf(action.id);
    const ids = [...state.nameIds.slice(0, i), ...state.nameIds.slice(i + 1)];
    return { ...state, nameIds: ids };
};

const setArtist = (state: IArtistState, action: ISetArtistAction): IArtistState => {
    const artist = action.artist;

    return {
        ...state,
        endedOn: artist.endedOn,
        id: artist.id,
        kind: artist.kind,
        membershipIds: artist.memberships.map((m) => m.id),
        nameIds: artist.names.map((n) => n.id),
        startedOn: artist.startedOn,
    };
};

const setEndedOn = (state: IArtistState, action: ISetEndedOnAction): IArtistState => {
    return { ...state, endedOn: action.endedOn };
};

const setKind = (state: IArtistState, action: ISetKindAction): IArtistState => {
    return { ...state, kind: action.kind };
};

const setStartedOn = (state: IArtistState, action: ISetStartedOnAction): IArtistState => {
    return { ...state, startedOn: action.startedOn };
};

export const initialState: IArtistState = {
    endedOn: "",
    id: "0",
    kind: "PERSON",
    membershipIds: [],
    nameIds: ["-1"],
    startedOn: "",
};

const reducer: Reducer<IArtistState> = (
    state: IArtistState = initialState,
    action: Action,
): IArtistState => {
    switch (action.type) {
        case ActionTypes.SetEndedOn: return setEndedOn(state, action);
        case ActionTypes.SetKind: return setKind(state, action);
        case ActionTypes.SetStartedOn: return setStartedOn(state, action);

        case ArtistFormActionTypes.SetArtist: return setArtist(state, action);

        case ArtistNamesActionTypes.AddName: return addName(state, action);
        case ArtistNamesActionTypes.RemoveName: return removeName(state, action);

        default: return state;
    }
};

export default reducer;