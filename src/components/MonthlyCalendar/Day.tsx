import * as classNames from "classnames";
import { LocalDate, YearMonth } from "js-joda";
import * as React from "react";

import "./Day.css";

interface IProps {
    day: LocalDate;
    month: YearMonth;
    today: LocalDate;
}

const getDayOfMonth = (day: LocalDate): number => day.dayOfMonth();

const isInMonth = (day: LocalDate, month: YearMonth): boolean => (
    day.month() === month.month()
);

const isToday = (day: LocalDate, today: LocalDate): boolean => (
    day.equals(today)
);

const Day: React.StatelessComponent<IProps> = ({ day, month, today }) => {
    const className = classNames({
        "not-in-month": !isInMonth(day, month),
        "today": isToday(day, today),
    });

    return <td className={className}>{getDayOfMonth(day)}</td>;
};

export default Day;
