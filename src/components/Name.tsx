import * as React from "react";

interface IProps {
    names: any;
    original?: boolean;
}

const Name: React.StatelessComponent<IProps> = ({ names, original }) => {
    const name = (original)
        ? names.find((n: any) => n.isOriginal)
        : names.find((n: any) => n.isDefault);

    if (!name) {
        return <span>invalid name</span>;
    }

    return <span>{name.name}</span>;
};

export default Name;
