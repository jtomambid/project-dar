import AppContext from "./AppContext";
import { useContext } from "react";

const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("Hook called outside of provider");
	}

	return context;
};

export default useAppContext;
