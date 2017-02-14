import * as React from "react";
import { BaseLink } from "react-router5";
import { NavigationOptions, Params } from "router5";

interface IProps {
    to: string;
    params?: Params;
    options?: NavigationOptions;
}

const Link: React.StatelessComponent<IProps> = ({ children, options, params, to }) => {
    return (
        <BaseLink routeName={to} routeParams={params} routeOptions={options}>
            {children}
        </BaseLink>
    );
};

export default Link;
