import * as React from "react";
import { BaseLink } from "react-router5";
import { NavigationOptions } from "router5";

interface IProps {
    to: string;
    params?: any;
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
