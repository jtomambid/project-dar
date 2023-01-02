// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import Reset from "../../screens/Reset";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Reset" component={Reset} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack;