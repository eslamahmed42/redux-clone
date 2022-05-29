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
	 * Wrap action code to avoid boilerplate.
	 */
	const createUser = user => ({
		type: CREATE_USER,
		payload: user
	});

	/**
	 * A reference to all the nodes we will need.
	 */
	const $username = document.getElementById('username');
	const $createUser = document.getElementById('create-user');
	const $users = document.getElementById('users');
	const $statePayload = document.getElementById('state-payload');

	/**
	 * Render the initial state.
	 */
	$statePayload.textContent = JSON.stringify(getState());

	/**
	 * Fetches the latest created user.
	 */
	const getLatestUser = () => {
		const users = getState().users;
		return users[users.length - 1];
	};

	/**
	 * When there's an update, render it to the screen.
	 */
	const stopRenderingNewlyCreatedUsers = subscribe(() => {
		const $user = document.createElement('div');
		$user.textContent = getLatestUser().name;
		$users.appendChild($user);
	});

	/**
	 * Render the current state as JSON to the screen.
	 */
	const stopRenderingStatePayload = subscribe(() => {
		$statePayload.textContent = JSON.stringify(getState());
	});

	/**
	 * Prevent clients from dispatching empty usernames.
	 */
	$username.addEventListener('input', ({ target }) => {
		if (/\S/.test(target.value)) {
			$createUser.disabled = false;
		} else {
			$createUser.disabled = true;
		}
	});

	/**
	 * Listen for <button> click.
	 *
	 * 1. Get the user's name from the <input> element.
	 * 2. Dispatch an action to update the state.
	 * 3. After dispatching, a subscriber will carry-on the process of rendering.
	 */
	$createUser.addEventListener('click', () => {
		const username = $username.value;
		$username.value = '';
		$createUser.disabled = true;
		dispatch(createUser({
			name: username
		}));
	});
});
