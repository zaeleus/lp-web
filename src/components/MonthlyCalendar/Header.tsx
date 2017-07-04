import * as moment from "moment";
import * as React from "react";

import Link from "../Link";

import "./Header.css";

interface IProps {
    month: moment.Moment;
}

class Header extends React.Component<IProps, {}> {
    public title(): string {
        return this.props.month.format("MMMM YYYY");
    }

    public prevMonth(): string {
        return this.props.month.clone().subtract(1, "month").format("YYYY-MM");
    }

    public nextMonth(): string {
        return this.props.month.clone().add(1, "month").format("YYYY-MM");
    }

    public render() {
        return (
            <header>
                <Link to="calendar" params={{ date: this.prevMonth() }}>&laquo;</Link>
                <h3>{this.title()}</h3>
                <Link to="calendar" params={{ date: this.nextMonth() }}>&raquo;</Link>
            </header>
        );
    }
}

export default Header;
