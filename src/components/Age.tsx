import * as moment from "moment";
import * as React from "react";

interface IProps {
    from: string;
    to: string;
}

const calculateAge = (from: string, to: string): number => {
    const startedOn = moment(from, "YYYY-MM-DD");
    const endedOn = moment(to, "YYYY-MM-DD");
    return endedOn.diff(startedOn, "year");
};

const Age: React.StatelessComponent<IProps> = ({ from, to }) => (
    <span>{calculateAge(from, to)}</span>
);

export default Age;
