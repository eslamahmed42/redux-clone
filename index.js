/**
 * Copyright (c) 2022, Eslam Ahmed.
 */

window.addEventListener('DOMContentLoaded', () => {
	/**
	 * Our initial state.
	 */
	const state = {
		users: []
	};

	/**
	 * An action type.
	 */
	const CREATE_USER = 'CREATE_USER';

	/**
	 * Root reducer.
	 */
	const reducer = (state, action) => {
		switch (action.type) {
			case CREATE_USER:
				return {
					...state,
					users: state.users.concat([action.payload])
				};
			default:
				return state;
		}
	};

	/**
	 * Create a store instance.
	 */
	const { getState, dispatch, subscribe } = createStore(reducer, state);

	/**
	 * Log the newly created user to the browser's console.
	 */
	const unsubscribe = subscribe(() => {
		const users = getState().users;
		console.log(users[users.length - 1]);
	});

	/**
	 * Wrap action code to avoid boilerplate.
	 */
	const createUser = user => ({
		type: CREATE_USER,
		payload: user
	});

	/**
	 * Dispatch an action to add a new user.
	 */
	dispatch(createUser({
		id: 0,
		name: 'Aladdin',
		following: 0,
		followers: 0
	}));
});
