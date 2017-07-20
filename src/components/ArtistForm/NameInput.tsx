import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import actionCreators from "../../actions/artist-form";
import { IArtistName, IState } from "../../reducers/artist-form";

interface IOwnProps {
    id: string;
}

interface IStateProps {
    name: IArtistName;
}

interface IDispatchProps {
    setNameIsDefault: any;
    setNameIsOriginal: any;
    setNameLocale: any;
    setNameName: any;
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
                <td>
                    <input
                        type="radio"
                        checked={this.props.name.isOriginal}
                        onChange={this.onIsOriginalChange} />
                </td>
                <td>
                    <input
                        type="radio"
                        checked={this.props.name.isDefault}
                        onChange={this.onIsDefaultChange} />
                </td>
            </tr>
        );
    }

    private onIsDefaultChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setNameIsDefault(this.props.id, event.currentTarget.checked);
    }

    private onIsOriginalChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setNameIsOriginal(this.props.id, event.currentTarget.checked);
    }

    private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setNameName(this.props.id, event.currentTarget.value);
    }

    private onLocaleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.setNameLocale(this.props.id, event.currentTarget.value);
    }
}

const mapStateToProps = ({ artistForm }: { artistForm: IState }, ownProps: IOwnProps) => ({
    name: artistForm.artistNames[ownProps.id],
});

const mapDispatchToProps = (dispatch: Dispatch<IState>) => (
    bindActionCreators({
        setNameIsDefault: actionCreators.setNameIsDefault,
        setNameIsOriginal: actionCreators.setNameIsOriginal,
        setNameLocale: actionCreators.setNameLocale,
        setNameName: actionCreators.setNameName,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
