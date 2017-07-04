// react-router5 4.0.1

declare module "react-router5" {
    import * as React from "react";
    import { Params, Router, State } from "router5";
    import { Options } from "router5/core/navigation";

    interface BaseLinkProps {
        routeName: string;
        routeParams?: Params;
        routeOptions?: Options;
        activeClassName?: string;
        activeStrict?: boolean;
        onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
    }

    class BaseLink extends React.Component<BaseLinkProps, {}> {}

    interface RouterProviderProps {
        router: Router;
    }

    class RouterProvider extends React.Component<RouterProviderProps, {}> {}

    class Link extends BaseLink {}

    interface RouteNodeProps {
        router: Router;
        previousRoute: State;
        route: State;
    }

    function routeNode(
        nodeName: string
    ): <P>(RouteSegment: React.ComponentClass<P & RouteNodeProps>) => React.ComponentClass<P>;

    interface WithRouteProps {
        router: Router;
        previousRoute: State;
        route: State;
    }

    function withRoute<P>(
        BaseComponent: React.ComponentClass<P & WithRouteProps>
    ): React.ComponentClass<P>;
}
