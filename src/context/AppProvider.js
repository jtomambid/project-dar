import React, { useState, useEffect, useReducer } from "react";
import AppContext from "./AppContext";
import { AppReducer, defaultState } from "./Reducer";

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, defaultState);

	const [cart, setCart] = useState([]);
	console.log("state", state);
	const setCurrentUser = async data => {
		dispatch({
			type: "SET_CURRENT_USER",
			payload: data,
		});
	};

	// const setCart = data => {
	// 	console.log("data", data);
	// 	// dispatch({
	// 	// 	type: "SET_CART",
	// 	// 	payload: data,
	// 	// });
	// };
	const payload = {
		cart,
		setCurrentUser,
		setCart,
		reducer: {
			dispatch,
			state,
		},
	};

	return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
};

export default AppProvider;
