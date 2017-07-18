import * as moment from "moment";
import * as React from "react";

interface IProps {
    date: string;
    format: string;
}

const Date: React.StatelessComponent<IProps> = ({ date, format }) => (
    <span>{moment.utc(date).format(format)}</span>
);

export default Date;
