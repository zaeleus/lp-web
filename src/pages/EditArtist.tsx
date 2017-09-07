import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ArtistForm from "../components/ArtistForm";
import { IArtist } from "../models/Artist";

import actionCreators, { ISetArtistAction } from "../actions/artist-form";
import { IArtistFormState } from "../reducers/artist-form";

interface IDispatchProps {
    setArtist(artist: IArtist): ISetArtistAction;
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
    public componentWillReceiveProps(props: IProps) {
        const { artist, loading } = props;
        if (loading || !artist) { return; }
        this.props.setArtist(artist);
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
            country
            kind
            startedOn
            endedOn
            names {
                id
                name
                locale
                isDefault
                isOriginal
            }
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

const PatchArtist = gql`
    mutation PatchArtist($input: ArtistInput!) {
        patchArtist(input: $input) {
            id
            kind
            country
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

const mapDispatchToProps = (dispatch: Dispatch<IArtistFormState>) => (
    bindActionCreators({
        setArtist: actionCreators.setArtist,
    }, dispatch)
);

export default compose(
    query,
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
