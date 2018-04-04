import * as React from "react";

import { IArtist} from "../../queries/GetCalendar";
import Age from "../Age";
import Date from "../Date";
import Link from "../Link";
import Name from "../Name";

import "./Birthdays.css";

interface IProps {
    artists: IArtist[];
    date: string;
}

const Birthdays: React.StatelessComponent<IProps> = ({ artists, date }) => {
    const items = artists.map((a, i) => (
        <li key={i}>
            <div className="profile">
                <Link to="artist" params={{ id: a.id }}>
                    <img src="https://via.placeholder.com/48x48" />
                </Link>
            </div>
            <div className="dates">
                <div className="day"><Date date={a.startedOn} format="dd" /></div>
                <div className="age">(<Age from={a.startedOn} to={date} />)</div>
            </div>
            <div className="names">
                <div>
                    <Link to="artist" params={{ id: a.id }}>
                        <Name names={a.names} original={true} />
                    </Link>
                </div>
                <div>
                    <Link to="artist" params={{ id: a.id }}>
                        <Name names={a.names} />
                    </Link>
                </div>
            </div>
        </li>
    ));

    return <ul className="birthdays">{items}</ul>;
};

export default Birthdays;
