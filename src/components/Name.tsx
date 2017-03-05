import * as React from "react";

interface IProps {
    names: any;
    original?: boolean;
}

const Name: React.StatelessComponent<IProps> = ({ names, original }) => {
    let name;

    if (original) {
        name = names.find((n: any) => n.isOriginal);
    } else {
        name = names.find((n: any) => n.isDefault);
    }

    if (!name) {
        return <span>invalid name</span>;
    }

    return <span>{name.name}</span>;
};

export default Name;
