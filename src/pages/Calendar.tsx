import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import MonthlyAlbums from "../components/MonthlyAlbums";
import MonthlyCalendar from "../components/MonthlyCalendar";
import { IAlbum } from "../models/Album";

interface IComponentProps {
    date: string;
}

interface IDataProps {
    albumsByReleaseMonth: IAlbum[];
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

        return (
            <div>
                <h2>Calendar</h2>

                <div id="content">
                    <div className="secondary">
                        <MonthlyCalendar date={this.props.date} />
                    </div>

                    <div className="primary">
                        <MonthlyAlbums albums={albums} />
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
        }
    }
`;

export default graphql(AlbumsByReleaseMonth)(Calendar);
