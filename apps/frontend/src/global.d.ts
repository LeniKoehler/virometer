import 'reactn';

declare module 'reactn/default' {

    export interface Reducers {

        append: (
            global: State,
            dispatch: Dispatch,
            ...strings: any[]
        ) => Pick<State, 'isOpen'>;

        increment: (
            global: State,
            dispatch: Dispatch,
            i: number,
        ) => Pick<State, 'theme'>;

        doNothing: (
            global: State,
            dispatch: Dispatch,
        ) => null;
    }

    export interface State {
        counties?: Array<Landkreis>
        states?: Array<Bundesland>
        countyId?: number
        isOpen?: boolean
        stateId?: number
        theme?: "dark" | "light"
        title?: string
    }
}