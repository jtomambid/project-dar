import React, { useState, useEffect, createContext } from "react";
import { getKeyValue } from "./src/helpers/utils";

const defaultValue = {
	currentUser: null,
	cart: null,
};

const defaultState = (key = "") => {
	const state = {
		currentUser: null,
		cart: null,
	};

	return key !== "" ? getKeyValue({ obj: state, key }) : state;
};

const AppReducer = (state, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER": {
			const { currentUser } = action.payload;

			return {
				...state,
				currentUser,
			};
		}

		case "SET_CART": {
			const { cart } = action.payload;

			return {
				...state,
				cart,
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

const AppContext = createContext(defaultValue);

const AppProvider = ({ children }) => {
	const payload = {};

	return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
};

export default AppProvider;
