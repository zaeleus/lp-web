import { YearMonth } from "js-joda";
import * as React from "react";

import Link from "../Link";

import "./Header.css";

interface IProps {
    month: YearMonth;
}

const MONTH_MAP: { [key: number]: string } = {
    1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December",
};

const title = (month: YearMonth): string => {
    return `${MONTH_MAP[month.monthValue()]} ${month.year()}`;
};

const prevMonth = (month: YearMonth): string => month.minusMonths(1).toString();
const nextMonth = (month: YearMonth): string => month.plusMonths(1).toString();

const Header: React.StatelessComponent<IProps> = ({ month }) => (
    <header>
        <Link to="calendar" params={{ date: prevMonth(month) }}>&laquo;</Link>
        <h3>{title(month)}</h3>
        <Link to="calendar" params={{ date: nextMonth(month) }}>&raquo;</Link>
    </header>
);

export default Header;
