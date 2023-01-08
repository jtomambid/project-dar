/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import 'react-native-gesture-handler';
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppProvider from "./src/context/AppProvider";
import "./src/configs/firebase";
import RootNavigation from "./src/navigation";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const App = () => {
	return (
		<PaperProvider>
			<AppProvider>
				<RootNavigation />
			</AppProvider>
		</PaperProvider>
	);
};

export default App;
