import * as moment from "moment";
import * as React from "react";

import Day from "./Day";

interface IProps {
    now: moment.Moment;
    month: moment.Moment;
    week: moment.Moment[];
}

const Week: React.StatelessComponent<IProps> = ({ now, month, week }) => (
    <tr>
        {week.map((day, i) => <Day key={i} now={now} month={month} day={day} />)}
    </tr>
);

export default Week;
