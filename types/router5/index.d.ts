// router5 4.4.1

declare module "router5" {
    import constants, { errorCodes } from "router5/constants";
    import loggerPlugin from "router5/plugins/logger";

    export type DoneFn = (err: Error | null, state: State | null) => void;

    export interface Route {
        name: string;
        path: string;
    }

    export interface Options {
        trailingSlash?: number;
        useTrailingSlash?: boolean | undefined;
        autoCleanUp?: boolean;
        strictQueryParams?: boolean;
        allowNotFound?: boolean;
        strongMatching?: boolean;
    }

    export interface Error {
        code: string;
        [key: string]: any;
    }

    export interface Params {
        [key: string]: any;
    }

    export interface Dependencies {
        [key: string]: any;
    }

    export interface State {
        name: string;
        params: Params;
        path: string;
        metaParams?: Params;
        source?: string;
        [key: string]: any;
    }

    export interface Router {
        makeState(name: string, params: Params, path: string, metaParams?: Params, source?: string): State;
        makeNotFoundState(path: string): State;
        getState(): State;
        setState(state: State): void;
        getOptions(): Options;
        setOption(option: string, value: any): Router;
        setDependency(dependencyName: string, dependency: any): Router;
        setDependencies(deps: Dependencies): Router;
        getDependencies(): Dependencies;
        add(routes: Route[]): Router;
        addNode(name: string, path: string, canActivateHandler?: CanActivateHandler): Router;
    }

    export function createRouter(
        routes: Route[],
        options?: Options,
        dependencies?: Dependencies,
    ): Router;

    export default createRouter;

    export {
        // RouteNode,
        loggerPlugin,
        errorCodes,
        // transitionPath,
        constants,
    };
}

declare module "router5/constants" {
    interface ErrorCodes {
        ROUTER_NOT_STARTED: string;
        NO_START_PATH_OR_STATE: string;
        ROUTER_ALREADY_STARTED: string;
        ROUTE_NOT_FOUND: string;
        SAME_STATES: string;
        CANNOT_DEACTIVATE: string;
        CANNOT_ACTIVATE: string;
        TRANSITION_ERR: string;
        TRANSITION_CANCELLED: string;
    }

    export const errorCodes: ErrorCodes;

    interface Constants {
        UNKNOWN_ROUTE: string;
        ROUTER_START: string;
        ROUTER_STOP: string;
        TRANSITION_START: string;
        TRANSITION_CANCEL: string;
        TRANSITION_SUCCESS: string;
        TRANSITION_ERROR: string;
    }

    const constants: Constants;

    export default constants;
}

declare module "route5/core/clone" {
    module "router5" {
        interface Router {
            clone(deps?: Dependencies): Router;
        }
    }
}

declare module "router5/core/middleware" {
    module "router5" {
        type Middleware = (toState: State, fromState: State, done: DoneFn) => boolean | Promise<any>;
        type MiddelwareFactory = (router: Router) => Middleware;

        interface Router {
            useMiddleware(...middlewares: MiddelwareFactory[]): Router;
            clearMiddleware(): Router;
        }
    }
}

declare module "router5/core/navigation" {
    module "router5" {
        type CancelFn = () => void;

        interface NavigationOptions {
            replace?: boolean;
            reload?: boolean;
        }

        interface Router {
            cancel(): Router;
            navigate(routeName: string, routeParams: Params, options: NavigationOptions, done?: DoneFn): CancelFn;
            navigate(routeName: string, routeParams: Params, done?: DoneFn): CancelFn;
            navigate(routeName: string, done?: DoneFn): CancelFn;
            navigateToDefault(opts: NavigationOptions, done?: DoneFn): CancelFn;
            navigateToDefault(done?: DoneFn): CancelFn;
        }
    }
}

declare module "router5/core/plugins" {
    module "router5" {
        interface Plugin {
            pluginName: string;
            onStart?: () => void;
            onStop?: () => void;
            onTransitionStart?: (toState?: State, fromState?: State) => void;
            onTransitionCancel?: (toState?: State, fromState?: State) => void;
            onTransitionError?: (toState?: State, fromState?: State, err?: Error) => void;
            onTransitionSuccess?: (toState?: State, fromState?: State, opts?: NavigationOptions) => void;
        }

        interface Router {
            usePlugin(...plugins: Plugin[]): Router;
            hasPlugin(pluginName: string): boolean;
        }
    }
}

declare module "router5/core/route-lifecycle" {
    module "router5" {
        type CanDeactivateHandler = (toState: State, fromState: State) => boolean;
        type CanActivateHandler = (toState: State, fromState: State) => boolean;

        interface Router {
            canDeactivate(name: string, canDeactivateHandler: CanDeactivateHandler | boolean): Router;
            clearCanDeactivate(name: string): Router;
            canActivate(name: string, canActivateHandler: CanActivateHandler | boolean): Router;
        }
    }
}

declare module "router5/core/router-lifecycle" {
    module "router5" {
        interface Router {
            isStarted(): boolean;
            start(startPathOrState: string | State, done?: DoneFn): void;
            start(done?: DoneFn): void;
            stop(): void;
        }
    }
}

declare module "router5/core/utils" {
    module "router5" {
        interface Router {
            isActive(
                name: string,
                params?: Params,
                strictEquality?: boolean,
                ignoreQueryParams?: boolean,
            ): boolean;

            areStatesEqual(
                state1: State,
                state2: State,
                ignoreQueryParams?: boolean
            ): boolean;

            areStatesDescendants(parentState: State, childState: State): boolean;

            buildPath(route: string, params: Params): string;
            matchPath(path: string, source?: string): State | null;
            setRootPath(rootPath: string): void;
        }
    }
}

declare module "router5/plugins/browser" {
    import * as Router5 from "router5";

    module "router5" {
        interface Router {
            buildUrl(route: string, params: Params): string;
            urlToPath(url: string): string;
            matchUrl(url: string): State | null;
        }
    }

    export interface Options {
        forceDeactivate?: boolean;
        useHash?: boolean;
        hashPrefix?: string;
        base?: boolean;
    }

    export interface Browser {
        getBase(value: any): any;
        pushState(state: any, title: string, url?: string | null | undefined): void;
        replaceState(state: any, title: string, url?: string | null | undefined): void;
        addPopstateListener(fn: WindowEventMap["popstate"]): void;
        removePopstateListener(fn: WindowEventMap["popstate"]): void;
        getLocation(opts: Options): any;
        getState(): any;
    }

    export interface NoopBrowser {
        getBase(value: any): any;
        pushState(): void;
        replaceState(): void;
        addPopstateListener(): void;
        removePopstateListener(): void;
        getLocation(value: any): any;
        getState(value: any): any;
    }

    function browserPluginFactory(opts?: Options, browser?: Browser | NoopBrowser): Router5.Plugin;

    export default browserPluginFactory;
}

declare module "router5/plugins/listeners" {
    import * as Router5 from "router5";

    export interface Options {
        autoCleanUp?: boolean;
    }

    function listenersPluginFactory(options?: Options): Router5.Plugin;

    export default listenersPluginFactory;
}

declare module "router5/plugins/logger" {
    import * as Router5 from "router5";
    function loggerPlugin(): Router5.Plugin;
    export default loggerPlugin;
}

declare module "router/plugins/persistentParams" {
    import * as Router5 from "router5";
    function persistentParamsPluginFactory(params: Router5.Params): Router5.Plugin;
    export default persistentParamsPluginFactory;
}
