import gql from "graphql-tag";
import * as moment from "moment";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Alert from "../components/Alert";
import Birthdays from "../components/Calendar/Birthdays";
import MonthlyAlbums from "../components/MonthlyAlbums";
import MonthlyCalendar from "../components/MonthlyCalendar";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";

interface IComponentProps {
    date: string;
}

interface IDataProps {
    albumsByReleaseMonth: IAlbum[];
    artistsByStartMonth: IArtist[];
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

class Calendar extends React.Component<IProps, {}> {
    public render() {
        if (!this.props.data) {
            return <h2>Not found</h2>;
        }

        if (this.props.data.loading) {
            return <h2>Loading...</h2>;
        }

        const albums = this.props.data.albumsByReleaseMonth;
        const artists = this.props.data.artistsByStartMonth;
        const date = this.props.date;
        const endOfMonth = moment(date, "YYYY-MM").endOf("month").format("YYYY-MM-DD");

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
    }
}

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
                releasedOn
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
            }
        }
    }
`;

export default graphql(AlbumsByReleaseMonth)(Calendar);
