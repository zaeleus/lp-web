import * as React from "react";

interface IProps {
    names: any;
}

const Name: React.StatelessComponent<IProps> = ({ names }) => {
    const name = names.find((n: any) => n.isDefault);

    if (!name) {
        return <span>invalid name</span>;
    }

    return <span>{name.name}</span>;
};

export default Name;
