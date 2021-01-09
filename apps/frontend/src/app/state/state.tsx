import { counties, states, Bundesland, Landkreis } from "@virometer-gmbh/ui";

/**
 * This is just the description of our state and not the implementation.
 */

export type State = {
    counties?: Array<Landkreis>
    states?: Array<Bundesland>
    countyId?: number
    isOpen?: boolean
    stateId?: number
    theme?: "dark" | "light"
    title?: string
}

/**
 * Our actual state.
 */

export const initialState: State = {
    counties,
    states,
    countyId: null,
    isOpen: false,
    stateId: null,
    theme: 'dark',
    title: ''
}

