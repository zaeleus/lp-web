import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ArtistForm from "../components/ArtistForm";
import { IArtist } from "../models/Artist";

import actionCreators from "../actions/artist-form";
import { IState } from "../reducers/artist-form";

interface IDispatchProps {
    setArtist: any;
}

interface IMutationProps {
    mutate: any;
}

interface IOwnProps {
    id: string;
}

interface IQueryProps {
    artist?: IArtist;
    loading: boolean;
}

type IProps = IDispatchProps & IMutationProps & IOwnProps & IQueryProps;

class EditArtist extends React.Component<IProps, {}> {
    public render() {
        const { artist, loading } = this.props;

        if (loading) {
            return <h2>Loading...</h2>;
        }

        if (!artist) {
            return <h2>Not found</h2>;
        }

        this.props.setArtist({
            endedOn: artist.endedOn,
            id: artist.id,
            kind: artist.kind,
            startedOn: artist.startedOn,
        }, artist.names);

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Artist</h2>
                    <ArtistForm onSubmit={this.props.mutate} />
                </div>
            </div>
        );
    }
}

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            kind
            startedOn
            endedOn
            names {
                name
                locale
                isDefault
                isOriginal
            }
        }
    }
`;

const PatchArtist = gql`
    mutation PatchArtist($input: ArtistInput!) {
        patchArtist(input: $input) {
            id
            kind
            startedOn
            endedOn
            names {
                name
                locale
                isDefault
                isOriginal
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

const mapDispatchToProps = (dispatch: Dispatch<IState>) => (
    bindActionCreators({
        setArtist: actionCreators.setArtist,
    }, dispatch)
);

export default compose(
    query,
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
