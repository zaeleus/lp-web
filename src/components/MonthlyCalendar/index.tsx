import { DayOfWeek, LocalDate, TemporalAdjusters, YearMonth, ZoneId } from "js-joda";
import * as React from "react";

import Header from "./Header";
import Week from "./Week";

import "./index.css";

interface IProps {
    date: string;
}

const generateWeeks = (month: YearMonth): LocalDate[][] => {
    const firstDay = month
        .atDay(1)
        .with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

    const lastDay = month
        .atEndOfMonth()
        .with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

    let day = firstDay;
    const weeks: LocalDate[][] = [];

    while (day.isBefore(lastDay)) {
        const week: LocalDate[] = [];

        for (let i = 0; i < 7; i++) {
            week.push(day);
            day = day.plusDays(1);
        }

        weeks.push(week);
    }

    return weeks;
};

const MonthlyCalendar: React.StatelessComponent<IProps> = ({ date }) => {
    const today = LocalDate.now(ZoneId.UTC);
    const month = YearMonth.parse(date);
    const weeks = generateWeeks(month).map((week, i) => (
        <Week key={i} month={month} today={today} week={week} />
    ));

    return (
        <div className="monthly-calendar">
            <Header month={month} />

            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyCalendar;
