import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql, MutationOpts, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions as router5ActionCreators } from "redux-router5";

import ArtistForm from "../components/ArtistForm";
import Loading from "../components/Loading";
import { IArtist } from "../models/Artist";

import artistFormActionCreators from "../actions/artist-form";
import { IArtistFormState } from "../reducers/artist-form";

interface IDispatchProps {
    navigateTo(name: string, params?: any, opts?: any): void;
    setArtist(artist: IArtist): void;
}

interface IInputProps {
    id: string;
}

interface IResult {
    artist?: IArtist;
    patchArtist?: IArtist;
}

type WrappedProps = OptionProps<IInputProps, IResult>;
type Props = IDispatchProps & IInputProps & IResult & WrappedProps;

class EditArtist extends React.Component<Props, {}> {
    public componentWillReceiveProps(props: Props) {
        if (!props.data) { return; }

        const { artist, error, loading, patchArtist } = props.data;

        if (loading || error) { return; }

        if (artist) {
            this.props.setArtist(artist);
        } else if (patchArtist) {
            this.props.setArtist(patchArtist);
        }
    }

    public render() {
        if (!this.props.data) { return null; }

        const { error, loading } = this.props.data;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <h2>Error loading edit artist form</h2>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Artist</h2>
                    <ArtistForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }

    private onSubmit = async (opts: MutationOpts<{ [key: string]: any }>) => {
        const { mutate, navigateTo } = this.props;

        if (mutate) {
            await mutate(opts);
            navigateTo("artist", { id: this.props.id });
        }
    }
}

const FindArtist = gql`
    query FindArtist($id: ID!) {
        artist(id: $id) {
            id
            country
            disambiguation
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
        navigateTo: router5ActionCreators.navigateTo,
        setArtist: artistFormActionCreators.setArtist,
    }, dispatch)
);

export default compose(
    graphql(FindArtist),
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
