import { ChronoUnit, LocalDate, ZoneId } from "js-joda";
import * as React from "react";

interface IProps {
    from: string;
    to: string;
}

const calculateAge = (from: string, to: string): number => {
    const startedOn = LocalDate.parse(from).atStartOfDayWithZone(ZoneId.UTC);
    const endedOn = LocalDate.parse(to).atStartOfDayWithZone(ZoneId.UTC);
    return startedOn.until(endedOn, ChronoUnit.YEARS);
};

const Age: React.StatelessComponent<IProps> = ({ from, to }) => (
    <span>{calculateAge(from, to)}</span>
);

export default Age;
