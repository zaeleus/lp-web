import gql from "graphql-tag";
import * as React from "react";
import { graphql, InjectedGraphQLProps } from "react-apollo";

import Urls from "../components/Release/Urls";
import { IRelease } from "../models/Release";

interface IComponentProps {
    id: string;
}

interface IDataProps {
    release: IRelease;
}

type IProps = IComponentProps & InjectedGraphQLProps<IDataProps>;

const ShowRelease: React.StatelessComponent<IProps> = ({ data }) => {
    if (!data) {
        return <h2>Not found</h2>;
    }

    if (data.loading) {
        return <h2>Loading...</h2>;
    }

    const release = data.release;

    return (
        <div>
            <h2>Release {release.id}</h2>

            <h3>External Links</h3>
            <Urls urls={release.urls} />
        </div>
    );
};

const FindRelease = gql`
    query FindRelease($id: ID!) {
        release(id: $id) {
            id
            urls {
                name
                url
            }
        }
    }
`;

export default graphql(FindRelease)(ShowRelease);
