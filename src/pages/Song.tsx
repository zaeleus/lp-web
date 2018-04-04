import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Contributions from "../components/Song/Contributions";
import Header from "../components/Song/Header";
import Releases from "../components/Song/Releases";
import Urls from "../components/Song/Urls";
import FindSong, { ISong } from "../queries/FindSong";

interface IInputProps {
    id: string;
}

interface IResult {
    song: ISong;
}

type Props = IInputProps & DataValue<IResult, IInputProps>;

const ShowSong: React.StatelessComponent<Props> = ({ error, loading, song }) => {
    if (loading) {
        return <Loading />;
    }

    if (error || !song) {
        return <h2>Error loading song</h2>;
    }

    const contributions = (song.contributions.length === 0)
        ? <Alert>No contributions.</Alert>
        : <Contributions contributions={song.contributions} />;

    const releases = (song.appearsOn.length === 0)
        ? <Alert>No appearances.</Alert>
        : <Releases releases={song.appearsOn} />;

    const urls = (song.urls.length === 0)
        ? <Alert>No external links.</Alert>
        : <Urls urls={song.urls} />;

    return (
        <div id="content">
            <div className="full">
                <Header song={song} />

                <h3>Appears On</h3>
                {releases}

                <h3>External Links</h3>
                {urls}

                <h3>Contributions</h3>
                {contributions}
            </div>
        </div>
    );
};

export default graphql<IInputProps>(FindSong, {
    props: ({ data }) => ({ ...data }),
})(ShowSong);
