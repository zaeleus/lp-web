import gql from "graphql-tag";
import { YearMonth } from "js-joda";
import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Alert from "../components/Alert";
import Birthdays from "../components/Calendar/Birthdays";
import MonthlyAlbums from "../components/Calendar/MonthlyAlbums";
import Loading from "../components/Loading";
import MonthlyCalendar from "../components/MonthlyCalendar";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";

interface IInputProps {
    date: string;
}

interface IResult {
    albumsByReleaseMonth: IAlbum[];
    artistsByStartMonth: IArtist[];
}

type Props = DataValue<IResult, IInputProps> & IInputProps;

const Calendar: React.StatelessComponent<Props> = ({
    albumsByReleaseMonth,
    artistsByStartMonth,
    date,
    error,
    loading,
}) => {
    if (loading) {
        return <Loading />;
    }

    if (error
            || !albumsByReleaseMonth
            || !artistsByStartMonth) {
        return <h2>Error loading calendar</h2>;
    }

    const albums = albumsByReleaseMonth;
    const artists = artistsByStartMonth;
    const endOfMonth = YearMonth.parse(date).atEndOfMonth().toString();

    const monthlyAlbums = (albums.length === 0)
        ? <Alert>No albums.</Alert>
        : <MonthlyAlbums albums={albums} />;

    return (
        <div id="content">
            <div className="full">
                <h2>Calendar</h2>

                <div id="content">
                    <div className="secondary">
                        <MonthlyCalendar date={date} />
                        <Birthdays artists={artists} date={endOfMonth} />
                    </div>

                    <div className="primary">
                        {monthlyAlbums}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AlbumsByReleaseMonth = gql`
    query AlbumsByReleaseMonth($date: String!) {
        albumsByReleaseMonth(date: $date) {
            id
            names {
                name
                isDefault
                isOriginal
            }
            defaultRelease {
                id
                country
                releasedOn
                artworkUrls {
                    thumbnail
                }
            }
            artistCredit {
                id
                names {
                    id
                    position
                    name
                    locale
                    isDefault
                    isOriginal
                    separator
                    artist {
                        id
                    }
                }
            }
        }

        artistsByStartMonth(date: $date) {
            id
            startedOn
            names {
                id
                name
                isDefault
                isOriginal
            }
        }
    }
`;

export default graphql(AlbumsByReleaseMonth, {
    props: ({ data }) => ({ ...data }),
})(Calendar);
