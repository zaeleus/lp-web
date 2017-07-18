import gql from "graphql-tag";
import * as moment from "moment";
import * as React from "react";
import { graphql } from "react-apollo";

import Alert from "../components/Alert";
import Birthdays from "../components/Calendar/Birthdays";
import MonthlyAlbums from "../components/Calendar/MonthlyAlbums";
import MonthlyCalendar from "../components/MonthlyCalendar";
import { IAlbum } from "../models/Album";
import { IArtist } from "../models/Artist";

interface IComponentProps {
    date: string;
}

interface IDataProps {
    albumsByReleaseMonth?: IAlbum[];
    artistsByStartMonth?: IArtist[];
    loading: boolean;
}

type IProps = IComponentProps & IDataProps;

class Calendar extends React.Component<IProps, {}> {
    public render() {
        if (this.props.loading) {
            return <h2>Loading...</h2>;
        }

        if (!this.props.albumsByReleaseMonth || !this.props.artistsByStartMonth) {
            return <h2>Not found</h2>;
        }

        const albums = this.props.albumsByReleaseMonth;
        const artists = this.props.artistsByStartMonth;
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

const withData = graphql<IProps, IComponentProps>(AlbumsByReleaseMonth, {
    props: ({ data }) => {
        if (!data) {
            return {};
        }

        return {
            albumsByReleaseMonth: data.albumsByReleaseMonth,
            artistsByStartMonth: data.artistsByStartMonth,
            loading: data.loading,
        };
    },
});

export default withData(Calendar);
