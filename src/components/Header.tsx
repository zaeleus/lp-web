import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ActionNavigateTo, actions } from "redux-router5";

import Link from "./Link";
import SearchBox from "./SearchBox";

import "./Header.css";

interface IDispatchProps {
    navigateTo(name: string, params?: any, opts?: any): ActionNavigateTo;
}

class Header extends React.Component<IDispatchProps> {
    public search = (query: string): void => {
        this.props.navigateTo("search", { query });
    }

    public render() {
        return (
            <header id="header">
                <h1><Link to="home">LP</Link></h1>

                <ul>
                    <li><Link to="calendar">Calendar</Link></li>
                    <li><SearchBox onSubmit={this.search} /></li>
                </ul>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => (
    bindActionCreators({ navigateTo: actions.navigateTo }, dispatch)
);

export default connect(null, mapDispatchToProps)(Header);
