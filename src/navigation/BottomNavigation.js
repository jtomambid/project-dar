import React, { useState, useEffect } from "react";
import { Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "screens/Home";
import Dashboard from "screens/Dashboard";
import Location from "screens/Location";
import Donate from "screens/Donate";
import Profile from "screens/Profile";
import Statistic from "screens/Statistic";
import FAIcon from "react-native-vector-icons/FontAwesome";
import ENIcon from "react-native-vector-icons/Entypo";
import Settings from "../../screens/Settings";
import { db } from "../../src/configs/firebase";
import { doc, getDoc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const BottomTab = createBottomTabNavigator();

export default function BottomNavigation() {
	const auth = getAuth();

	const [currentUser, setCurrentUser] = useState();

	const getData = async () => {
		const docRef = doc(db, "users", auth.currentUser.uid);
		try {
			const user = await getDoc(docRef);
			console.log("user", user.data());
			if (user.exists()) {
				console.log("document data:", user.data());
				setCurrentUser(user.data());
			} else {
				console.log("no data");
			}
		} catch (err) {
			console.log("err", err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<BottomTab.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerShown: false,
				unmountOnBlur: true,
				tabBarShowLabel: false,
				tabBarStyle: {
					...style.tabBar,
				},
				tabBarHideOnKeyboard: true,
			}}>
			<BottomTab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<View style={style.tabBarIconContainer}>
									<FAIcon name="home" color="#fff" size={30} />
								</View>
								<View>
									{focused && (
										<View
											style={{
												backgroundColor: focused ? "#00FE1E" : "#5F5D70",
												...style.tabBarIndicatorStyle,
											}}
										/>
									)}
								</View>
							</View>
						);
					},
				}}
			/>
			<BottomTab.Screen
				name="Location"
				component={Location}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<View style={style.tabBarIconContainer}>
									<ENIcon name="location" color="#fff" size={30} />
								</View>
								<View>
									{focused && (
										<View
											style={{
												backgroundColor: focused ? "#00FE1E" : "#5F5D70",
												...style.tabBarIndicatorStyle,
											}}
										/>
									)}
								</View>
							</View>
						);
					},
				}}
			/>
			{currentUser?.role === "donor" && (
				<BottomTab.Screen
					name="Donate"
					component={Donate}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<View>
									<View style={style.tabBarIconContainer}>
										<FAIcon name="gift" color="#fff" size={30} />
									</View>
									<View>
										{focused && (
											<View
												style={{
													backgroundColor: focused ? "#00FE1E" : "#5F5D70",
													...style.tabBarIndicatorStyle,
												}}
											/>
										)}
									</View>
								</View>
							);
						},
					}}
				/>
			)}
			<BottomTab.Screen
				name="Statistic"
				component={Statistic}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<View style={style.tabBarIconContainer}>
									<FAIcon name="line-chart" color="#fff" size={30} />
								</View>
								<View>
									{focused && (
										<View
											style={{
												backgroundColor: focused ? "#00FE1E" : "#5F5D70",
												...style.tabBarIndicatorStyle,
											}}
										/>
									)}
								</View>
							</View>
						);
					},
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<View>
								<View style={style.tabBarIconContainer}>
									<FAIcon name="user" color="#fff" size={30} />
								</View>
								<View>
									{focused && (
										<View
											style={{
												backgroundColor: focused ? "#00FE1E" : "#5F5D70",
												...style.tabBarIndicatorStyle,
											}}
										/>
									)}
								</View>
							</View>
						);
					},
				}}
			/>
			<BottomTab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarVisible: false,
					tabBarButton: () => null,
				}}
			/>
		</BottomTab.Navigator>
	);
}

const style = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	tabBar: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: "#196332",
	},
	tabBarIconContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	tabBarIndicatorStyle: {
		marginTop: 2,
		width: 25,
		height: 4,
		borderRadius: 2.5,
		alignSelf: "center",
	},
});
