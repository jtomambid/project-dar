import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth } from "firebase/auth";
import { db } from "../../src/configs/firebase";
import { doc, getDoc, onSnapshot, collection, getDocs } from "firebase/firestore";

const ThemeLayout = ({ headerTitle, children, hasMenu = true }) => {
	const auth = getAuth();

	const [currentUser, setCurrentUser] = useState();

	const navigation = useNavigation();

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
		<View style={style.container}>
			<View style={style.headerContainer}>
				<View style={style.headerTextContainer}>
					<Text style={style.headerText}>{headerTitle}</Text>
				</View>
				{hasMenu && (
					<View style={style.menuContainer}>
						{currentUser?.role === "donor" && (
							<TouchableOpacity style={style.menuPadding} onPress={() => navigation.navigate("Cart")}>
								<Icon name="shopping-basket" color="#00FE1E" size={30} />
							</TouchableOpacity>
						)}
						<TouchableOpacity style={style.menuPadding} onPress={() => navigation.navigate("Settings")}>
							<Icon name="cog" color="black" size={30} />
						</TouchableOpacity>
					</View>
				)}
			</View>
			<View style={style.contentContainer}>{children}</View>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "#fff",
	},
	headerContainer: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		height: "10%",
	},
	menuContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	contentContainer: {
		height: "90%",
	},
	headerTextContainer: {
		backgroundColor: "#196332",
		padding: 10,
		borderRadius: 10,
	},
	headerText: {
		fontSize: 19,
		fontWeight: "bold",
		color: "#ffffff",
	},
	menuPadding: {
		paddingHorizontal: 5,
	},
});

export default ThemeLayout;
