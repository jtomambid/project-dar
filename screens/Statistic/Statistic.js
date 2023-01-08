import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import ThemeLayout from "../../components/layout/ThemeLayout";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../src/configs/firebase";
import { doc, getDoc, onSnapshot, collection, getDocs, query, where } from "firebase/firestore";

const Statistic = () => {
	const auth = getAuth();
	const navigation = useNavigation();

	const [resourceBank, setResourceBank] = useState();
	const [foods, setFoods] = useState();
	const [medicines, setMedicines] = useState();
	const [selectedResourceBank, setSelectedResourceBank] = useState();
	const [error, setError] = useState();

	const getResourceBank = async () => {
		const docRef = collection(db, "resourceBank");
		try {
			const resourceBank = await getDocs(docRef);
			setResourceBank(resourceBank.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};
	const getDonationFood = async () => {
		const docRef = collection(db, "donations");
		try {
			const donationFood = query(docRef, where("resourceBank", "==", selectedResourceBank.id));

			const getFood = await getDocs(donationFood);
			const food = getFood.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			console.log("food", food);
			setFoods(food);
		} catch (err) {
			console.log("err", err);
		}
	};

	useEffect(() => {
		getResourceBank();
	}, []);

	useEffect(() => {
		if (selectedResourceBank) {
			getDonationFood();
		}
	}, [selectedResourceBank]);

	const renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => setSelectedResourceBank(item)}>
			<Image
				key={item.id}
				source={{ uri: item?.image }}
				style={[
					item?.id === selectedResourceBank?.id
						? {
								borderWidth: 1,
								borderColor: "#00FE1E",
								borderRadius: 15,
						  }
						: "",
					{ width: 150, height: 150, resizeMode: "contain" },
				]}
			/>
		</TouchableOpacity>
	);

	const renderTopResource = ({ item }) => (
		<ScrollView>
			<View style={{ marginHorizontal: 50 }}>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-around",
						marginVertical: 20,
						borderBottomWidth: 1,
						paddingVertical: 5,
					}}>
					<View>
						<Text style={{ fontWeight: "normal", fontSize: 16 }}>{item?.donationItem}</Text>
					</View>
					<TouchableOpacity>
						<View>
							<Text>{item?.quantity}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);

	return (
		<ThemeLayout headerTitle={"Statistic"}>
			<ScrollView style={{ marginHorizontal: 20 }} contentContainerStyle={{ height: "100%" }}>
				<View>
					<View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Resource Bank</Text>
					</View>
					<FlatList
						data={resourceBank}
						renderItem={renderItem}
						keyExtractor={item => item?.id}
						horizontal
						style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
					/>
				</View>
				<View>
					<View style={{ marginVertical: 20 }}>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Top Resources</Text>
					</View>
					<View style={{ marginHorizontal: 50, justifyContent: "space-around", flexDirection: "row" }}>
						<Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>Item Name</Text>
						<Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>Quantity</Text>
					</View>
					<FlatList
						data={foods}
						renderItem={renderTopResource}
						keyExtractor={item => item?.id}
						// style={{ padding: 10 }}
					/>
				</View>
			</ScrollView>
		</ThemeLayout>
	);
};

export default Statistic;
