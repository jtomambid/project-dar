// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../../screens/Cart";
import Home from "../../screens/Home";
import Settings from "../../screens/Settings";
import BottomNavigation from "./BottomNavigation";
import SettingStack from "./SettingStack";

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="BottomNavigation" component={BottomNavigation} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Settings" component={Settings} />
				<Stack.Screen name="Cart" component={Cart} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default DashboardStack;
