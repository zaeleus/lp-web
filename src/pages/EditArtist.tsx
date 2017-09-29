import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ArtistForm from "../components/ArtistForm";
import { IArtist } from "../models/Artist";

import actionCreators, { ISetArtistAction } from "../actions/artist-form";
import { IArtistFormState } from "../reducers/artist-form";

interface IDispatchProps {
    setArtist(artist: IArtist): ISetArtistAction;
}

interface IInputProps {
    id: string;
}

interface IResult {
    artist: IArtist;
}

type WrappedProps = OptionProps<IInputProps, IResult>;
type Props = IDispatchProps & IInputProps & IResult & WrappedProps;

class EditArtist extends React.Component<Props, {}> {
    public componentWillReceiveProps(props: Props) {
        if (!props.data) { return; }
        const { artist, error, loading } = props.data;
        if (loading || error) { return; }
        this.props.setArtist(artist);
    }

    public render() {
        if (!this.props.data) { return null; }

        const { error, loading } = this.props.data;

        if (loading) {
            return <h2>Loading...</h2>;
        }

        if (error) {
            return <h2>Error loading edit artist form</h2>;
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

const mapDispatchToProps = (dispatch: Dispatch<IArtistFormState>) => (
    bindActionCreators({
        setArtist: actionCreators.setArtist,
    }, dispatch)
);

export default compose(
    graphql<IResult, IInputProps, WrappedProps>(FindArtist),
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
