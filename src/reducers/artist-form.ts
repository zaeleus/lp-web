import { Reducer } from "redux";
import { Action, ActionTypes } from "../actions/artist-form";

export interface IArtist {
    readonly endedOn: string;
    readonly id: string;
    readonly kind: string;
    readonly memberships: string[];
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

export interface IArtistCredit {
    readonly names: string[];
}

export interface IArtistCreditName {
    readonly name: string;
    readonly locale: string;
    readonly isDefault: boolean;
    readonly isOriginal: boolean;
}

export interface IMembership {
    readonly artistCredit: string;
}

export interface IState {
    readonly artist: IArtist;
    readonly artistNames: IArtistNames;
    readonly memberships: {
        readonly [id: string]: IMembership;
    };
    readonly artistCredits: {
        readonly [id: string]: IArtistCredit;
    };
    readonly artistCreditNames: {
        readonly [id: string]: IArtistCreditName;
    };
}

let artistNameId = 0;
const nextArtistNameId = (): string => {
    return `artistName.${artistNameId++}`;
};

let membershipId = 0;
const nextMembershipId = (): string => {
    return `membership.${membershipId++}`;
};

let artistCreditId = 0;
const nextArtistCreditId = (): string => {
    return `membership.${artistCreditId++}`;
};

let artistCreditNameId = 0;
const nextArtistCreditNameId = (): string => {
    return `membership.${artistCreditNameId++}`;
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
        memberships: [],
        names: [initialArtistNameId],
        startedOn: "",
    },
    artistCreditNames: {},
    artistCredits: {},
    artistNames: {
        [initialArtistNameId]: {
            isDefault: true,
            isOriginal: true,
            locale: "",
            name: "",
        },
    },
    memberships: {},
};

const reducer: Reducer<IState> = (state: IState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.AddName: {
            const id = nextArtistNameId();

            return {
                ...state,
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
            const { artist } = action;

            const artistNames: any = {};

            for (const name of artist.names) {
                artistNames[nextArtistNameId()] = {
                    isDefault: name.isDefault,
                    isOriginal: name.isOriginal,
                    locale: name.locale,
                    name: name.name,
                };
            }

            const artistCreditNames: any = {};
            const artistCredits: any = {};
            const memberships: any = {};

            for (const membership of artist.memberships) {
                const artistCreditNameIds = [];

                for (const name of membership.artistCredit.names) {
                    const artistCreditNameId = nextArtistCreditNameId();

                    artistCreditNames[artistCreditNameId] = {
                        isDefault: name.isDefault,
                        isOriginal: name.isOriginal,
                        locale: name.locale,
                        name: name.name,
                    };

                    artistCreditNameIds.push(artistCreditNameId);
                }

                const artistCreditId = nextArtistCreditId();
                artistCredits[artistCreditId] = {
                    names: artistCreditNameIds,
                };

                memberships[nextMembershipId()] = {
                    artistCredit: artistCreditId,
                };
            }

            return {
                ...state,
                artist: {
                    ...state.artist,
                    endedOn: artist.endedOn,
                    id: artist.id.toString(),
                    kind: artist.kind,
                    memberships: Object.keys(memberships),
                    names: Object.keys(artistNames),
                    startedOn: artist.startedOn,
                },
                artistCreditNames,
                artistCredits,
                artistNames,
                memberships,
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
