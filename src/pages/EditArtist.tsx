import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql, MutationOpts, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions as router5ActionCreators } from "redux-router5";

import ArtistForm from "../components/ArtistForm";
import Loading from "../components/Loading";
import { IArtist } from "../models/Artist";

interface IDispatchProps {
    navigateTo(name: string, params?: any, opts?: any): void;
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

class EditArtist extends React.Component<Props> {
    public render() {
        if (!this.props.data) { return null; }

        const { artist, error, loading, patchArtist } = this.props.data;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <h2>Error loading edit artist form</h2>;
        }

        let form;

        if (artist) {
            form = <ArtistForm artist={artist} onSubmit={this.onSubmit} />;
        } else if (patchArtist) {
            form = <ArtistForm artist={patchArtist} onSubmit={this.onSubmit} />;
        } else {
            return <h2>Error loading edit artist form</h2>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Artist</h2>
                    {form}
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => (
    bindActionCreators({
        navigateTo: router5ActionCreators.navigateTo,
    }, dispatch)
);

export default compose(
    graphql(FindArtist),
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
