import * as React from "react";
import { compose, graphql, MutationOpts, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions as router5ActionCreators } from "redux-router5";

import Alert from "../components/Alert";
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

interface IState {
    error: string;
}

class EditArtist extends React.Component<Props, IState> {
    public state = { error: "" };

    public render() {
        if (!this.props.data) { return null; }

        const { artist, error, loading } = this.props.data;

        if (loading) {
            return <Loading />;
        }

        if (error || !artist) {
            return <h2>Error loading edit artist form</h2>;
        }

        let alert;

        if (this.state.error) {
            alert = <Alert kind="error">{this.state.error}</Alert>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Artist</h2>
                    {alert}
                    <ArtistForm artist={artist} onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }

    private onSubmit = async (opts: MutationOpts<IArtistInput>) => {
        const { mutate, navigateTo } = this.props;

        if (mutate) {
            try {
                await mutate(opts);
                navigateTo("artist", { id: this.props.id });
            } catch (e) {
                this.setState({ error: e.message });
            }
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
