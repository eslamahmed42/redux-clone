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
	 * After dispatching an action, all the subscribers are notified.
	 */
	const dispatch = action => {
		current = reducer(current, action);
		notify();
	};

	/**
	 * Subscribe to state updates.
	 *
	 * 1. Add the subscriber to the subscribers set.
	 * 2. Return a function to unsubscribe by removing the subscriber.
	 */
	const subscribe = subscriber => {
		subscribers.add(subscriber);
		return () => {
			subscribers.delete(subscriber);
		};
	};

	/**
	 * Notifies the subscribers that there is a state update.
	 */
	const notify = () => {
		subscribers.forEach(subscriber => {
			subscriber();
		});
	};

	/**
	 * The Redux API.
	 */
	return {
		getState,
		dispatch,
		subscribe
	};

};
