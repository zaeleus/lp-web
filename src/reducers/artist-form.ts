import { Reducer } from "redux";
import { Action, ActionTypes } from "../actions/artist-form";

export interface IArtist {
    readonly endedOn: string;
    readonly id: string;
    readonly kind: string;
    readonly names: string[];
    readonly startedOn: string;
}

export interface IArtistName {
    readonly name: string;
    readonly locale: string;
    readonly isDefault: boolean;
    readonly isOriginal: boolean;
}

export interface IArtistNames {
    readonly [id: string]: IArtistName;
}

export interface IState {
    readonly artist: IArtist;
    readonly artistNames: IArtistNames;
}

let artistNameId = 0;
const nextArtistNameId = (): string => {
    return `artistName.${artistNameId++}`;
};

const buildArtistName = (): IArtistName => ({
    isDefault: false,
    isOriginal: false,
    locale: "",
    name: "",
});

const initialArtistNameId = nextArtistNameId();

const initialState: IState = {
    artist: {
        endedOn: "",
        id: "0",
        kind: "PERSON",
        names: [initialArtistNameId],
        startedOn: "",
    },
    artistNames: {
        [initialArtistNameId]: {
            isDefault: true,
            isOriginal: true,
            locale: "",
            name: "",
        },
    },
};

const reducer: Reducer<IState> = (state: IState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.AddName: {
            const id = nextArtistNameId();

            return {
                artist: {
                    ...state.artist,
                    names: [...state.artist.names, id],
                },
                artistNames: {
                    ...state.artistNames,
                    [id]: buildArtistName(),
                },
            };
        }

        case ActionTypes.SetArtist: {
            const artistNames = action.names.reduce((names: any, name) => {
                names[nextArtistNameId()] = {
                    isDefault: name.isDefault,
                    isOriginal: name.isOriginal,
                    locale: name.locale,
                    name: name.name,
                };

                return names;
            }, {});

            return {
                ...state,
                artist: {
                    ...state.artist,
                    ...action.artist,
                    names: Object.keys(artistNames),
                },
                artistNames,
            };
        }

        case ActionTypes.SetEndedOn:
            return {
                ...state,
                artist: {
                    ...state.artist,
                    endedOn: action.endedOn,
                },
            };

        case ActionTypes.SetKind:
            return {
                ...state,
                artist: {
                    ...state.artist,
                    kind: action.kind,
                },
            };

        case ActionTypes.SetNameIsDefault: {
            const artistNames = state.artist.names.reduce((names: any, id) => {
                names[id] = { ...state.artistNames[id], isDefault: id === action.id };
                return names;
            }, {});

            return { ...state, artistNames };
        }

        case ActionTypes.SetNameIsOriginal: {
            const artistNames = state.artist.names.reduce((names: any, id) => {
                names[id] = { ...state.artistNames[id], isOriginal: id === action.id };
                return names;
            }, {});

            return { ...state, artistNames };
        }

        case ActionTypes.SetNameName:
            return {
                ...state,
                artistNames: {
                    ...state.artistNames,
                    [action.id]: {
                        ...state.artistNames[action.id],
                        name: action.name,
                    },
                },
            };

        case ActionTypes.SetNameLocale:
            return {
                ...state,
                artistNames: {
                    ...state.artistNames,
                    [action.id]: {
                        ...state.artistNames[action.id],
                        locale: action.locale,
                    },
                },
            };

        case ActionTypes.SetStartedOn:
            return {
                ...state,
                artist: {
                    ...state.artist,
                    startedOn: action.startedOn,
                },
            };

        case ActionTypes.Reset:
            return initialState;

        default:
            return state;
    }
};

export default reducer;
