import { LocalDate, YearMonth } from "js-joda";
import * as React from "react";

import Day from "./Day";

interface IProps {
    month: YearMonth;
    today: LocalDate;
    week: LocalDate[];
}

const Week: React.StatelessComponent<IProps> = ({ month, today, week }) => (
    <tr>
        {week.map((day, i) => <Day key={i} day={day} month={month} today={today} />)}
    </tr>
);

export default Week;
