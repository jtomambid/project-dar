// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../../screens/Settings";
import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="Settings"
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="BottomNavigation" component={BottomNavigation} />
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	);
};

export default SettingStack;
