import { DateTimeFormatter, LocalDate, ZoneId } from "js-joda";
import * as React from "react";

interface IProps {
    date: string;
    format: string;
}

const Date: React.StatelessComponent<IProps> = ({ date, format }) => {
    const formatter = DateTimeFormatter.ofPattern(format);
    const temporal = LocalDate.parse(date).atStartOfDayWithZone(ZoneId.UTC);
    const formattedDate = temporal.format(formatter);
    return <span>{formattedDate}</span>;
};

export default Date;
