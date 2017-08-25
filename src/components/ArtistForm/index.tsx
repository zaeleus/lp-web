import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import artistActionCreators from "../../actions/artist";
import artistNamesActionCreators from "../../actions/artist-names";
import { IArtistState } from "../../reducers/artist";
import { IArtistFormState } from "../../reducers/artist-form";
import Names from "./Names";
import Roster from "./Roster";

import "./index.css";

interface IDispatchProps {
    addName: any;
    setEndedOn: any;
    setKind: any;
    setStartedOn: any;
}

interface IOwnProps {
    onSubmit: any;
}

interface IStateProps {
    artist: IArtistState;
}

type Props = IDispatchProps & IOwnProps & IStateProps;

class ArtistForm extends React.Component<Props, {}> {
    public render() {
        const { artist } = this.props;
        const rosterClass = classNames({ hidden: artist.kind !== "GROUP", group: true });

        return (
            <form className="artist-form" onSubmit={this.onSubmit}>
                <div className="group">
                    <label>Names <a href="#" onClick={this.addName}>[+]</a></label>
                    <Names nameIds={artist.nameIds} />
                </div>

                <div className="group">
                    <label>Kind</label>
                    <select value={artist.kind} onChange={this.onKindChange}>
                        <option value="PERSON">person</option>
                        <option value="GROUP">group</option>
                    </select>
                </div>

                <div className="dates group">
                    <div className="started-on">
                        <label>Started On</label>
                        <input type="text"
                            placeholder="YYYY-MM-DD"
                            value={artist.startedOn || ""}
                            onChange={this.onStartedOnChange} />
                    </div>

                    <div className="ended-on">
                        <label>Ended On</label>
                        <input type="text"
                            placeholder="YYYY-MM-DD"
                            value={artist.endedOn || ""}
                            onChange={this.onEndedOnChange} />
                    </div>
                </div>

                <div className={rosterClass}>
                    <label>Roster</label>
                    <Roster membershipIds={artist.membershipIds} />
                </div>

                <div className="group">
                    <input type="submit" value="Save" />
                </div>
            </form>
        );
    }

    private addName = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.props.addName();
    }

    private onEndedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setEndedOn(event.currentTarget.value);
    }

    private onKindChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.setKind(event.currentTarget.value);
    }

    private onStartedOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setStartedOn(event.currentTarget.value);
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.props.onSubmit({
            variables: {
                input: {
                    id: this.props.artist.id,
                    kind: this.props.artist.kind,
                },
            },
        });
    }
}

const mapStateToProps = ({ artistForm }: { artistForm: IArtistFormState }) => ({
    artist: artistForm.artist,
});

const mapDispatchToProps = (dispatch: Dispatch<IArtistFormState>) => (
    bindActionCreators({
        addName: artistNamesActionCreators.addName,
        setEndedOn: artistActionCreators.setEndedOn,
        setKind: artistActionCreators.setKind,
        setStartedOn: artistActionCreators.setStartedOn,
    }, dispatch)
);

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ArtistForm);
