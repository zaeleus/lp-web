import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import Alert from "../components/Alert";
import Albums from "../components/Artist/Albums";
import Groupships from "../components/Artist/Groupships";
import Header from "../components/Artist/Header";
import Memberships from "../components/Artist/Memberships";
import Meta from "../components/Artist/Meta";
import Urls from "../components/Artist/Urls";
import Link from "../components/Link";
import Loading from "../components/Loading";
import FindArtist, { IArtist } from "../queries/artist/FindArtist";

interface IInputProps {
    id: string;
}

interface IResult {
    artist: IArtist;
}

type Props = IInputProps & DataValue<IResult, IInputProps>;

const ShowArtist: React.StatelessComponent<Props> = ({ artist, error, loading }) => {
    if (loading) {
        return <Loading />;
    }

    if (error || !artist) {
        return <h2>Error loading artist</h2>;
    }

    let memberships;

    if (artist.kind === "GROUP") {
        const members = (artist.memberships.length === 0)
            ? <Alert>No members.</Alert>
            : <Memberships memberships={artist.memberships} />;

        memberships = (
            <div>
                <h3>Members</h3>
                <Link to="artists-memberships" params={{ id: artist.id }}>[edit]</Link>
                {members}
            </div>
        );
    } else {
        const groups = (artist.groupships.length === 0)
            ? <Alert>No groups.</Alert>
            : <Groupships groupships={artist.groupships} />;

        memberships = (
            <div>
                <h3>Groups</h3>
                {groups}
            </div>
        );
    }

    const albums = (artist.albums.length === 0)
        ? <Alert>No albums.</Alert>
        : <Albums albums={artist.albums} />;

    const urls = (artist.urls.length === 0)
        ? <Alert>No external links.</Alert>
        : <Urls urls={artist.urls} />;

    return (
        <div id="content">
            <div className="full">
                <Header artist={artist} />

                <div id="content">
                    <div className="secondary">
                        <Link to="artists-edit" params={{ id: artist.id }}>[edit]</Link>

                        <Meta artist={artist} />
                        {memberships}

                        <h3>External Links</h3>
                        {urls}
                    </div>

                    <div className="primary">
                        <h3>Albums</h3>
                        {albums}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default graphql(FindArtist, {
    props: ({ data }) => ({ ...data }),
})(ShowArtist);
