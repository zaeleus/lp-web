import * as React from "react";
import { compose, graphql, MutationOpts, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions as router5ActionCreators } from "redux-router5";

import ArtistForm from "../components/ArtistForm";
import Loading from "../components/Loading";
import FindArtistForEdit, { IArtist } from "../queries/artist/FindArtistForEdit";
import PatchArtist, { IArtistInput } from "../queries/artist/PatchArtist";

interface IDispatchProps {
    navigateTo(name: string, params?: any, opts?: any): void;
}

interface IInputProps {
    id: string;
}

interface IResult {
    artist?: IArtist;
}

type WrappedProps = OptionProps<IInputProps, IResult>;
type Props = IDispatchProps & IInputProps & IResult & WrappedProps;

class EditArtist extends React.Component<Props> {
    public render() {
        if (!this.props.data) { return null; }

        const { artist, error, loading } = this.props.data;

        if (loading) {
            return <Loading />;
        }

        if (error || !artist) {
            return <h2>Error loading edit artist form</h2>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Artist</h2>
                    <ArtistForm artist={artist} onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }

    private onSubmit = async (opts: MutationOpts<IArtistInput>) => {
        const { mutate, navigateTo } = this.props;

        if (mutate) {
            await mutate(opts);
            navigateTo("artist", { id: this.props.id });
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => (
    bindActionCreators({
        navigateTo: router5ActionCreators.navigateTo,
    }, dispatch)
);

export default compose(
    graphql(FindArtistForEdit),
    graphql(PatchArtist),
    connect(null, mapDispatchToProps),
)(EditArtist);
