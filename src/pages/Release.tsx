import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Header from "../components/Release/Header";
import Media from "../components/Release/Media";
import Meta from "../components/Release/Meta";
import Siblings from "../components/Release/Siblings";
import Urls from "../components/Release/Urls";
import FindRelease, { IRelease } from "../queries/release/FindRelease";

interface IInputProps {
    id: string;
}

interface IResult {
    release: IRelease;
}

type Props = IInputProps & DataValue<IResult, IInputProps>;

const ShowRelease: React.StatelessComponent<Props> = ({ error, loading, release }) => {
    if (loading) {
        return <Loading />;
    }

    if (error || !release) {
        return <h2>Error loading release</h2>;
    }

    const siblings = (release.siblings.length === 0)
        ? <Alert>No other releases.</Alert>
        : <Siblings releases={release.siblings} />;

    return (
        <div id="content">
            <div className="full">
                <Header release={release} />

                <Meta release={release} />

                <h3>Tracklist</h3>
                <Media media={release.media} />

                <h3>Other Releases</h3>
                {siblings}

                <h3>External Links</h3>
                <Urls urls={release.urls} />
            </div>
        </div>
    );
};

export default graphql<IInputProps>(FindRelease, {
    props: ({ data }) => ({ ...data }),
})(ShowRelease);
