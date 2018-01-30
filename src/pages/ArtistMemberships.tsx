import gql from "graphql-tag";
import * as React from "react";
import { compose, DataValue, graphql } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ArtistMemberhipsForm from "../components/ArtistMembershipsForm";
import { IArtist } from "../models/Artist";

import actionCreators from "../actions/artist-memberships-form";
import { IArtistMembershipsFormState } from "../reducers/artist-memberships-form";

interface IDispatchProps {
    setArtist(artist: IArtist): void;
}

interface IInputProps {
    id: string;
}

interface IResult {
    artist: IArtist;
}

type Props = DataValue<IResult, IInputProps> & IDispatchProps & IInputProps;

class ArtistMemberships extends React.Component<Props, {}> {
    public componentWillReceiveProps(props: Props) {
        const { artist, error, loading, setArtist } = props;
        if (loading || error || !artist) { return; }
        setArtist(artist);
    }

    public render() {
        const { error, loading } = this.props;

        if (loading) {
            return <h2>Loading...</h2>;
        }

        if (error) {
            return <h2>Error loading artist memberships form</h2>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Memberships</h2>
                    <ArtistMemberhipsForm />
                </div>
            </div>
        );
    }
}

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            memberships {
                id
                startedOn
                endedOn
                artistCredit {
                    id
                    names {
                        id
                        name
                        locale
                        isDefault
                        isOriginal
                        artist {
                            id
                        }
                    }
                }
            }
        }
    }
`;

const mapDispatchToProps = (dispatch: Dispatch<IArtistMembershipsFormState>) => (
    bindActionCreators({
        setArtist: actionCreators.setArtist,
    }, dispatch)
);

export default compose(
    graphql(FindArtist, {
        props: ({ data }) => ({ ...data }),
    }),
    connect(null, mapDispatchToProps),
)(ArtistMemberships);
