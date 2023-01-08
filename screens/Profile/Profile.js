import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import ThemeLayout from "../../components/layout/ThemeLayout";
import Button from "../../components/_common/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../src/configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAppContext from "../../src/context/useAppContext";

const Profile = () => {
	const auth = getAuth();
	const navigation = useNavigation();

	const [currentUser, setCurrentUser] = useState();

	const { setCart, cart } = useAppContext();

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
		<ThemeLayout headerTitle={"Profile"}>
			<View>
				<View style={{ paddingHorizontal: 40, justifyContent: "center", alignSelf: "center", marginVertical: 60 }}>
					<Image source={require("../../assets/DAR.png")} />
				</View>
				<View style={{ padding: 20 }}>
					<View style={style.textStyleContainer}>
						<Text style={style.textStyle}>Name: </Text>
						<Text style={style.textStyle}>{currentUser?.name}</Text>
					</View>
					<View style={style.textStyleContainer}>
						<Text style={style.textStyle}>Email: </Text>
						<Text style={style.textStyle}>{currentUser?.email}</Text>
					</View>
					<View style={style.textStyleContainer}>
						<Text style={style.textStyle}>Phone Number: </Text>
						<Text style={style.textStyle}>{currentUser?.phoneNumber}</Text>
					</View>
				</View>
				<View
					style={{
						position: "absolute",
						justifyContent: "center",
						alignSelf: "center",
						width: "100%",
						bottom: "-40%",
					}}>
					<TouchableOpacity
						onPress={() =>
							signOut(auth)
								.then(() => {
									setCart([]);
									navigation.replace("Login");
								})
								.catch(error => {
									alert(error.message);
								})
						}>
						<View style={{ justifyContent: "center", alignSelf: "center" }}>
							<Button styles={{ width: "50%" }}>
								<Text style={{ fontSize: 17, fontWeight: "bold" }}>LOGOUT</Text>
							</Button>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ThemeLayout>
	);
};

const style = StyleSheet.create({
	container: {
		backgroundColor: "red",
	},
	textStyle: {
		fontSize: 15,
		fontWeight: "bold",
		marginRight: 20,
		color: "#000000",
	},
	textStyleContainer: {
		marginVertical: 20,
		flexDirection: "row",
	},
});

export default Profile;
