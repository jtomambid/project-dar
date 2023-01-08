const defaultState = {
	currentUser: {},
	cart: [],
};

const AppReducer = (state, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER": {
			return {
				...state,
				currentUser: action.payload,
			};
		}

		case "SET_CART": {
			// const { id } = action.payload;
			// const carts = [...state.cart];

			// const index = state.carts.findIndex(cart => {
			// 	return cart.id === id;
			// });

			// carts[index] = action.payload;

			return {
				...state,
				cart: [...action.payload],
			};
		}

		default: {
			if (action.key) {
				if (typeof action.payload === "object") {
					return {
						...state,
						[action.key]: {
							...state[action.key],
							...action.payload,
						},
					};
				}

				return {
					...state,
					[action.key]: action.payload,
				};
			}

			return state;
		}
	}
};

export { AppReducer, defaultState };
