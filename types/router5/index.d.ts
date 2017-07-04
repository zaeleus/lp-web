declare module "router5" {
    import constants, { errorCodes } from "router5/constants";
    import createRouter, { Params, Router, State } from "router5/create-router";
    import loggerPlugin from "router5/plugins/loggers";

    export {
        createRouter,
        // RouteNode,
        loggerPlugin,
        errorCodes,
        // transitionPath,
        constants,

        Params,
        Router,
        State,
    };

    export default createRouter;
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

    export const errorCodes: ErrorCodes;
    export default constants;
}

declare module "router5/create-router" {
    import { CanActivateFn } from "router5/core/route-lifecycle";

    export type DoneFn = (err: Error, state: State) => void;

    export interface Dependencies {
        [key: string]: any;
    }

    export interface Options {
        defaultRoute?: string;
        defaultParams?: Params;
        trailingSlash?: boolean;
        useTrailingSlash?: boolean; // TODO: check undefined
        autoCleanUp?: boolean;
        strictQueryParams?: boolean;
        allowNotFound?: boolean;
        strongMatching?: boolean;
    }

    export interface Params {
        [key: string]: any;
    }

    export interface State {
        name: string;
        params: Params;
        path: string;
        meta?: { id: number, params: Params, source?: string };
    }

    export interface Route {
        name: string;
        path: string;
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
        addNode(name: string, path: string, canActivateHandler?: CanActivateFn): Router;
    }

    function createRouter(routes: Route[], opts?: Options, deps?: Dependencies): Router;

    export default createRouter;
}

declare module "router5/core/clone" {
    module "router5/create-router" {
        interface Router {
            clone(deps?: Dependencies): Router;
        }
    }
}

declare module "router5/core/middleware" {
    module "router5/create-router" {
        type Middleware = (toState: State, fromState: State, done: DoneFn) => boolean | Promise<any>;
        type MiddelwareFactory = (router: Router) => Middleware;

        interface Router {
            useMiddleware(...middlewares: MiddelwareFactory[]): Router;
            clearMiddleware(): Router;
        }
    }
}

declare module "router5/core/navigation" {
    type CancelFn = () => void;

    export interface Options {
        replace?: boolean;
        reload?: boolean;
    }

    module "router5/create-router" {
        interface Router {
            cancel(): Router;
            forward(fromRoute: string, toRoute: string): Router;
            navigate(routeName: string, routeParams: Params, options: Options, done?: DoneFn): CancelFn;
            navigate(routeName: string, routeParams: Params, done?: DoneFn): CancelFn;
            navigate(routeName: string, done?: DoneFn): CancelFn;
            navigateToDefault(opts: Options, done?: DoneFn): CancelFn;
            navigateToDefault(done?: DoneFn): CancelFn;
        }
    }
}

declare module "router5/core/plugins" {
    import { State } from "router5/create-router";
    import { Options } from "router5/core/navigation";

    export interface Plugin {
        pluginName: string;
        onStart?(): void;
        onStop?(): void;
        onTransitionStart?(toState?: State, fromState?: State): void;
        onTransitionCancel?(toState?: State, fromState?: State): void;
        onTransitionError?(toState?: State, fromState?: State, err?: Error): void;
        onTransitionSuccess?(toState?: State, fromState?: State, opts?: Options): void;
    }

    module "router5/create-router" {
        interface Router {
            usePlugin(...plugins: Plugin[]): Router;
            hasPlugin(pluginName: string): boolean;
        }
    }
}

declare module "router5/core/route-lifecycle" {
    import { Router, State } from "router5/create-router";

    export type CanActivateFn = (toState: State, fromState: State) => boolean;
    export type CanDeactivateFn = (toState: State, fromState: State) => boolean;

    module "router5/create-router" {
        interface Router {
            canDeactivate(name: string, canDeactivateHandler: CanActivateFn | boolean): Router;
            clearCanDeactivate(name: string): Router;
            canActivate(name: string, canActivateHandler: CanActivateFn | boolean): Router;
        }
    }
}

declare module "router5/core/router-lifecycle" {
    import { State } from "router5/create-router";

    module "router5/create-router" {
        interface Router {
            isStarted(): boolean;
            start(startPathOrState: string | State, done?: DoneFn): Router;
            start(done?: DoneFn): Router;
            stop(): Router;
        }
    }
}

declare module "router5/core/utils" {
    module "router5/create-router" {
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
                ignoreQueryParams?: boolean,
            ): boolean;

            areStatesDescendants(parentState: State, childState: State): boolean;
            buildPath(route: string, params: Params): string;
            matchPath(path: string, source?: string): State | null;
            setRootPath(rootPath: string): void;
        }
    }
}

declare module "router5/plugins/browser" {
    import { Plugin } from "router5/core/plugins";
    import Browser from "router5/plugins/browser/browser";

    export interface Options {
        forceDeactivate?: boolean;
        useHash?: boolean;
        hashPrefix?: string;
        base?: boolean;
        mergeState?: boolean;
        preserveHash?: boolean;
    }

    function browserPluginFactory(opts?: Options, browser?: Browser): Plugin;

    export default browserPluginFactory;
}

declare module "router5/plugins/browser/browser" {
    import { Options } from "router5/plugins/browser";

    interface Browser {
        getBase(value: any): any;
        pushState(state: any, title: string, url?: string | null | undefined): void;
        replaceState(state: any, title: string, url?: string | null | undefined): void;
        addPopstateListener(fn: WindowEventMap["popstate"]): void;
        removePopstateListener(fn: WindowEventMap["popstate"]): void;
        getLocation(opts: Options): any;
        getState(): any;
    }

    export default Browser;
}

declare module "router5/plugins/browser/utils" {
    module "router5/create-router" {
        interface Router {
            buildUrl(route: string, params: Params): string;
            urlToPath(url: string): string;
            matchUrl(url: string): State | null;
        }
    }
}

declare module "router5/plugins/loggers" {
    import { Plugin } from "router5/core/plugins";
    function loggerPlugin(): Plugin;
    export default loggerPlugin;
}

declare module "router5/plugins/persistentParams" {
    import { Params } from "router5/create-router";
    import { Plugin } from "router5/core/plugins";

    function persistentParamsPluginFactory(params?: Params): Plugin;

    export default persistentParamsPluginFactory;
}
