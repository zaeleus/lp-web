import * as classNames from "classnames";
import * as moment from "moment";
import * as React from "react";

import "./Day.css";

interface IProps {
    now: moment.Moment;
    month: moment.Moment;
    day: moment.Moment;
}

class Day extends React.Component<IProps, null> {
    public dayOfMonth(): string {
        return this.props.day.format("D");
    }

    public isInMonth(): boolean {
        return this.props.day.isSame(this.props.month, "month");
    }

    public isToday(): boolean {
        return this.props.day.isSame(this.props.now, "day");
    }

    public render() {
        const className = classNames({
            "not-in-month": !this.isInMonth(),
            "today": this.isToday(),
        });

        return <td className={className}>{this.dayOfMonth()}</td>;
    }
}

export default Day;
