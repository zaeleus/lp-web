import * as React from "react";
import { BaseLink } from "react-router5";
import { Options } from "router5/core/navigation";

interface IProps {
    to: string;
    params?: any;
    options?: Options;
}

const Link: React.StatelessComponent<IProps> = ({ children, options, params, to }) => {
    return (
        <BaseLink routeName={to} routeParams={params} routeOptions={options}>
            {children}
        </BaseLink>
    );
};

export default Link;
