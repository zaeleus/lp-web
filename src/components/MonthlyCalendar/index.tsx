import * as moment from "moment";
import * as React from "react";

import Header from "./Header";
import Week from "./Week";

import "./index.css";

interface IProps {
    date: string;
}

const generateWeeks = (date: moment.Moment): moment.Moment[][] => {
    const first = date.clone().startOf("month").startOf("week");
    const last = date.clone().endOf("month").endOf("week");

    const day = first;
    const weeks: moment.Moment[][] = [];

    while (day.isSameOrBefore(last)) {
        const week: moment.Moment[] = [];

        for (let i = 0; i < 7; i++) {
            week.push(day.clone());
            day.add(1, "day");
        }

        weeks.push(week);
    }

    return weeks;
};

class MonthlyCalendar extends React.Component<IProps, {}> {
    public render() {
        const days = moment.weekdaysShort().map((d, i) => <th key={i}>{d}</th>);

        const now = moment.utc();
        const month = moment.utc(this.props.date, "YYYY-MM");
        const weeks = generateWeeks(month).map((week, i) => {
            return <Week key={i} now={now} month={month} week={week} />;
        });

        return (
            <div className="monthly-calendar">
                <Header month={month} />

                <table>
                    <thead>
                        <tr>
                            {days}
                        </tr>
                    </thead>
                    <tbody>
                        {weeks}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MonthlyCalendar;
