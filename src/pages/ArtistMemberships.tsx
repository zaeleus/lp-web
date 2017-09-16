import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ArtistMemberhipsForm from "../components/ArtistMembershipsForm";
import { IArtist } from "../models/Artist";

import actionCreators from "../actions/artist-memberships-form";
import { IArtistMembershipsFormState } from "../reducers/artist-memberships-form";

interface IDispatchProps {
    setArtist(artist: IArtist): void;
}

interface IOwnProps {
    id: string;
}

interface IQueryProps {
    artist?: IArtist;
    loading: boolean;
}

type IProps = IDispatchProps & IOwnProps & IQueryProps;

class ArtistMemberships extends React.Component<IProps, {}> {
    public componentWillReceiveProps(props: IProps) {
        const { artist, loading, setArtist } = props;
        if (loading || !artist) { return; }
        setArtist(artist);
    }

    public render() {
        const { artist, loading } = this.props;

        if (loading) {
            return <h2>Loading...</h2>;
        }

        if (!artist) {
            return <h2>Not found</h2>;
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

const query = graphql<IQueryProps, IOwnProps>(FindArtist, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            artist: data.artist,
            loading: data.loading,
        };
    },
});

const mapDispatchToProps = (dispatch: Dispatch<IArtistMembershipsFormState>) => (
    bindActionCreators({
        setArtist: actionCreators.setArtist,
    }, dispatch)
);

export default compose(
    query,
    connect(null, mapDispatchToProps),
)(ArtistMemberships);
