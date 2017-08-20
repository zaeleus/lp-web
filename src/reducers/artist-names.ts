import { Reducer } from "redux";

import {
    ActionTypes as ArtistFormActionTypes,
    ISetArtistAction,
} from "../actions/artist-form";
import {
    Action,
    ActionTypes,
    IAddNameAction,
    IRemoveNameAction,
    ISetIsDefaultAction,
    ISetIsOriginalAction,
    ISetLocaleAction,
    ISetNameAction,
} from "../actions/artist-names";

export interface IArtistNameState {
    readonly id: string;
    readonly name: string;
    readonly locale: string;
    readonly isDefault: boolean;
    readonly isOriginal: boolean;
}

export interface IArtistNamesState {
    readonly [id: string]: IArtistNameState;
}

const buildArtistName = (id: string): IArtistNameState => ({
    id,
    isDefault: false,
    isOriginal: false,
    locale: "",
    name: "",
});

const addName = (state: IArtistNamesState, action: IAddNameAction): IArtistNamesState => {
    return { ...state, [action.id]: buildArtistName(action.id) };
};

const removeName = (state: IArtistNamesState, action: IRemoveNameAction): IArtistNamesState => {
    const names: any = { ...state };
    delete names[action.id];
    return names;
};

const setArtist = (state: IArtistNamesState, action: ISetArtistAction): IArtistNamesState => {
    for (const name of action.artist.names) {
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

    return state;
};

const setIsDefault = (state: IArtistNamesState, action: ISetIsDefaultAction): IArtistNamesState => {
    return Object.keys(state).reduce((names: any, id) => {
        names[id] = { ...state[id], isDefault: id === action.id };
        return names;
    }, {});
};

const setIsOriginal = (state: IArtistNamesState, action: ISetIsOriginalAction): IArtistNamesState => {
    return Object.keys(state).reduce((names: any, id) => {
        names[id] = { ...state[id], isOriginal: id === action.id };
        return names;
    }, {});
};

const setName = (state: IArtistNamesState, action: ISetNameAction): IArtistNamesState => {
    return {
        ...state,
        [action.id]: {
            ...state[action.id],
            name: action.name,
        },
    };
};

const setLocale = (state: IArtistNamesState, action: ISetLocaleAction): IArtistNamesState => {
    return {
        ...state,
        [action.id]: {
            ...state[action.id],
            locale: action.locale,
        },
    };
};

const initialNameState = {
    ...buildArtistName("-1"),
    isDefault: true,
    isOriginal: true,
};
export const initialState: IArtistNamesState = {
    [initialNameState.id]: initialNameState,
};

const reducer: Reducer<IArtistNamesState> = (
    state: IArtistNamesState = initialState,
    action: Action,
) => {
    switch (action.type) {
        case ActionTypes.AddName: return addName(state, action);
        case ActionTypes.RemoveName: return removeName(state, action);
        case ActionTypes.SetIsDefault: return setIsDefault(state, action);
        case ActionTypes.SetIsOriginal: return setIsOriginal(state, action);
        case ActionTypes.SetName: return setName(state, action);
        case ActionTypes.SetLocale: return setLocale(state, action);

        case ArtistFormActionTypes.SetArtist: return setArtist(state, action);

        default: return state;
    }
};

export default reducer;
