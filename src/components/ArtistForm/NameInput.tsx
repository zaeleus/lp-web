import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import actionCreators from "../../actions/artist-names";
import { IArtistFormState } from "../../reducers/artist-form";
import { IArtistNameState } from "../../reducers/artist-names";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    name: IArtistNameState;
}

interface IDispatchProps {
    setIsDefault: any;
    setIsOriginal: any;
    setLocale: any;
    setName: any;
    removeName(id: string): void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

class NameInput extends React.Component<Props, {}> {
    public render() {
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        value={this.props.name.name}
                        onChange={this.onNameChange} />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="und"
                        value={this.props.name.locale}
                        onChange={this.onLocaleChange} />
                </td>
                <td className="is-original">
                    <input
                        type="radio"
                        checked={this.props.name.isOriginal}
                        onChange={this.onIsOriginalChange} />
                </td>
                <td className="is-default">
                    <input
                        type="radio"
                        checked={this.props.name.isDefault}
                        onChange={this.onIsDefaultChange} />
                </td>
                <td className="actions">
                    <a href="#" onClick={this.onRemoveClick}>[x]</a>
                </td>
            </tr>
        );
    }

    private onIsDefaultChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setIsDefault(this.props.id, event.currentTarget.checked);
    }

    private onIsOriginalChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setIsOriginal(this.props.id, event.currentTarget.checked);
    }

    private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setName(this.props.id, event.currentTarget.value);
    }

    private onLocaleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setLocale(this.props.id, event.currentTarget.value);
    }

    private onRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.props.removeName(this.props.id);
    }
}

const mapStateToProps = (
    { artistForm }: { artistForm: IArtistFormState },
    ownProps: IOwnProps,
) => ({
    name: artistForm.artistNames[ownProps.id],
});

const mapDispatchToProps = (dispatch: Dispatch<IArtistFormState>) => (
    bindActionCreators({
        removeName: actionCreators.removeName,
        setIsDefault: actionCreators.setIsDefault,
        setIsOriginal: actionCreators.setIsOriginal,
        setLocale: actionCreators.setLocale,
        setName: actionCreators.setName,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
