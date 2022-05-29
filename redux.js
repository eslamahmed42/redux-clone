/**
 * Copyright (c) 2022, Eslam Ahmed.
 */

/**
 * Creates a store that holds the complete state tree of the app.
 */
const createStore = (reducer, state) => {

	/**
	 * The current state.
	 */
	let current = state;

	/**
	 * A set of subscribers to state updates.
	 */
	const subscribers = new Set();

	/**
	 * Returns the current state tree of the app. It is equal to the last value
	 * returned by the store's reducer.
	 */
	const getState = () => current;

	/**
	 * Dispatches an action. This is the only way to trigger a state change.
	 */
	const dispatch = action => {};

	/**
	 * Subscribe to state updates.
	 */
	const subscribe = subscriber => {};

	/**
	 * The Redux API.
	 */
	return {
		getState,
		dispatch,
		subscribe
	};

};
