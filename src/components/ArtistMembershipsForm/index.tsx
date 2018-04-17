import * as React from "react";

import { IArtist } from "../../queries/artist/memberships/FindArtist";
import Roster from "./Roster";

interface IArtistCreditNameState {
    id: string;
    name: string;
    isDefault: boolean;
    isOriginal: boolean;
}

export interface IArtistCreditNamesState {
    [id: string]: IArtistCreditNameState;
}

export interface IArtistCreditState {
    id: string;
    nameIds: string[];
}

export interface IArtistCreditsState {
    [id: string]: IArtistCreditState;
}

export interface IMembershipState {
    id: string;

    _delete: boolean;

    startedOn: string;
    endedOn: string;

    artistCreditId: string;
}

export interface IMembershipsState {
    [id: string]: IMembershipState;
}

export interface IArtistState {
    id: string;
    membershipIds: string[];
}

interface IState {
    artist: IArtistState;
    memberships: IMembershipsState;
    artistCredits: IArtistCreditsState;
    artistCreditNames: IArtistCreditNamesState;
}

interface IProps {
    artist: IArtist;
}

class ArtistMembershipsForm extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        const { artist } = this.props;
        this.state = normalize(artist);
    }

    public render() {
        const { artist, artistCreditNames, artistCredits, memberships } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className="group">
                    <label>Roster</label>
                    <Roster
                        artistCreditNames={artistCreditNames}
                        artistCredits={artistCredits}
                        membershipIds={artist.membershipIds}
                        memberships={memberships}
                        onMembershipStartedOnChange={this.onMembershipStartedOnChange}
                        onMembershipEndedOnChange={this.onMembershipEndedOnChange}
                        removeMembership={this.removeMembership}
                    />
                </div>

                <div className="group">
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }

    private setMembership = (id: string, membership: IMembershipState) => {
        this.setState((prevState) => ({
            ...prevState,
            memberships: {
                ...prevState.memberships,
                [id]: membership,
            },
        }));
    }

    private removeMembership = (id: string) => {
        this.setMembership(id, { ...this.state.memberships[id], _delete: true });
    }

    private onMembershipStartedOnChange = (id: string, startedOn: string) => {
        this.setMembership(id, { ...this.state.memberships[id], startedOn });
    }

    private onMembershipEndedOnChange = (id: string, endedOn: string) => {
        this.setMembership(id, { ...this.state.memberships[id], endedOn });
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
}

const normalize = (a: IArtist): IState => {
    const artist = {
        id: a.id,
        membershipIds: a.memberships.map((m) => m.id),
    };

    const memberships: IMembershipsState = {};
    const artistCredits: IArtistCreditsState = {};
    const artistCreditNames: IArtistCreditNamesState = {};

    for (const membership of a.memberships) {
        const { artistCredit } = membership;

        memberships[membership.id] = {
            id: membership.id,

            _delete: false,

            endedOn: membership.endedOn,
            startedOn: membership.startedOn,

            artistCreditId: artistCredit.id,
        };

        artistCredits[artistCredit.id] = {
            id: artistCredit.id,
            nameIds: artistCredit.names.map((n) => n.id),
        };

        for (const name of artistCredit.names) {
            artistCreditNames[name.id] = {
                id: name.id,

                isDefault: name.isDefault,
                isOriginal: name.isOriginal,
                name: name.name,
            };
        }
    }

    return {
        artist,
        artistCreditNames,
        artistCredits,
        memberships,
    };
};

export default ArtistMembershipsForm;
