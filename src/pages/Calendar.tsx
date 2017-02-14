import * as moment from "moment";
import * as React from "react";

import MonthlyCalendar from "../components/MonthlyCalendar";

interface IProps {
    date?: string;
}

class Calendar extends React.Component<IProps, {}> {
    public render() {
        const date = this.props.date || moment.utc().format("YYYY-MM");

        return (
            <div>
                <h2>Calendar</h2>

                <div id="content">
                    <div className="secondary">
                        <MonthlyCalendar date={date} />
                    </div>

                    <div className="primary">
                        <p>Nothing here.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;
