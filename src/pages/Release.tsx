import * as React from "react";

interface IProps {
    id: number;
}

const Release: React.StatelessComponent<IProps> = ({ id }) => (
    <div>
        <h2>Release {id}</h2>
    </div>
);

export default Release;
