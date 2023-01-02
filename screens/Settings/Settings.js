import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ThemeLayout from "../../components/layout/ThemeLayout";

const Settings = () => {
	return (
		<ThemeLayout headerTitle={"Settings"} hasMenu={false}>
			<View>
				<View style={{ paddingHorizontal: 40, justifyContent: "center", alignSelf: "center", marginVertical: 60 }}>
					<Image source={require("../../assets/DAR.png")} />
				</View>
				<ScrollView>
					<View
						style={{
							padding: 50,
							marginHorizontal: 20,
							borderRadius: 30,
							borderWidth: 2,
							borderColor: "#196332",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<TouchableOpacity>
							<View style={style.textStyleContainer}>
								<Text style={style.textStyle}>Account</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={style.textStyleContainer}>
								<Text style={style.textStyle}>Privacy and Security</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={style.textStyleContainer}>
								<Text style={style.textStyle}>Help and Support </Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={style.textStyleContainer}>
								<Text style={style.textStyle}>About</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
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

export default Settings;
