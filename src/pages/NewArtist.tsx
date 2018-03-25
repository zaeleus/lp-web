import * as React from "react";
import { compose, graphql, OptionProps } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions as router5ActionCreators } from "redux-router5";

import Alert from "../components/Alert";
import ArtistForm, {
    IState as IArtistFormState,
} from "../components/ArtistForm";
import CreateArtist, { INewArtistInput } from "../queries/artist/CreateArtist";
import { IArtist } from "../queries/artist/FindArtistForEdit";

const NEW_ARTIST: IArtist = {
    id: "",

    country: "",
    disambiguation: "",
    endedOn: "",
    kind: "PERSON",
    startedOn: "",

    names: [{
        id: "",

        isDefault: true,
        isOriginal: true,
        locale: "",
        name: "",
    }],
};

interface IDispatchProps {
    navigateTo(name: string, params?: any, opts?: any): void;
}

type Props = IDispatchProps & OptionProps;

interface IState {
    error: string;
}

class NewArtist extends React.Component<Props, IState> {
    public state = { error: "" };

    public render() {
        const { error } = this.state;

        let alert;

        if (error) {
            alert = <Alert kind="error">{error}</Alert>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>New Artist</h2>
                    {alert}
                    <ArtistForm artist={NEW_ARTIST} onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }

    private onSubmit = async (state: IArtistFormState) => {
        const { mutate, navigateTo } = this.props;

        if (!mutate) {
            return;
        }

        const opts = {
            variables: {
                input: buildNewArtistInput(state),
            },
        };

        try {
            const result = await mutate(opts);
            const { id } = result.data.createArtist;
            navigateTo("artist", { id });
        } catch (e) {
            this.setState({ error: e.message });
        }
    }
}

const buildNewArtistInput = (state: IArtistFormState): INewArtistInput => {
    const { artist } = state;

    const names = state.names
        .filter((name) => !name._delete)
        .map((name) => ({
            id: name.id,
            isDefault: name.isDefault,
            isOriginal: name.isOriginal,
            locale: name.locale,
            name: name.name,
        }));

    return {
        country: artist.country,
        disambiguation: artist.disambiguation,
        endedOn: artist.endedOn,
        kind: artist.kind,
        startedOn: artist.startedOn,

        names,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => (
    bindActionCreators({
        navigateTo: router5ActionCreators.navigateTo,
    }, dispatch)
);

export default compose(
    graphql(CreateArtist),
    connect(null, mapDispatchToProps),
)(NewArtist);
