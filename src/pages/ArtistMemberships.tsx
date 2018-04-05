import * as React from "react";
import { DataValue, graphql } from "react-apollo";

import ArtistMemberhipsForm from "../components/ArtistMembershipsForm";
import Loading from "../components/Loading";
import FindArtist, { IArtist } from "../queries/artist/memberships/FindArtist";

interface IInputProps {
    id: string;
}

interface IResult {
    artist: IArtist;
}

type Props = DataValue<IResult, IInputProps> & IInputProps;

class ArtistMemberships extends React.Component<Props> {
    public render() {
        const { artist, error, loading } = this.props;

        if (loading) {
            return <Loading />;
        }

        if (error || !artist) {
            return <h2>Error loading artist memberships form</h2>;
        }

        return (
            <div id="content">
                <div className="full">
                    <h2>Edit Memberships</h2>
                    <ArtistMemberhipsForm artist={artist} />
                </div>
            </div>
        );
    }
}

export default graphql<IInputProps>(FindArtist, {
    props: ({ data }) => ({ ...data }),
})(ArtistMemberships);
