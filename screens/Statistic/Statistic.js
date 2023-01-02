import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, Image } from "react-native";
import ThemeLayout from "../../components/layout/ThemeLayout";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../src/configs/firebase";
import { doc, getDoc, onSnapshot, collection, getDocs } from "firebase/firestore";

const renderItem = ({ item }) => (
	<View>
		<Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: "contain" }} />
	</View>
);

const Statistic = () => {
	const auth = getAuth();
	const navigation = useNavigation();

	const [resourceBank, setResourceBank] = useState();
	const [foods, setFoods] = useState();
	const [medicines, setMedicines] = useState();

	const getResourceBank = async () => {
		const docRef = collection(db, "resourceBank");
		try {
			const resourceBank = await getDocs(docRef);
			setResourceBank(resourceBank.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};

	const getFoods = async () => {
		const docRef = collection(db, "foods");
		try {
			const foods = await getDocs(docRef);
			setFoods(foods.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};

	const getMedicines = async () => {
		const docRef = collection(db, "medicine");
		try {
			const medicines = await getDocs(docRef);
			setMedicines(medicines.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};
	useEffect(() => {
		getResourceBank();
		getFoods();
		getMedicines();
	}, []);

	return (
		<ThemeLayout headerTitle={"Statistic"}>
			<ScrollView
				style={{ marginHorizontal: 20 }}
				contentContainerStyle={{ justifyContent: "space-between", height: "100%" }}>
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
					<View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Food</Text>
					</View>
					{/* <FlatList
						data={medicines}
						renderItem={renderItem}
						keyExtractor={item => item?.id}
						horizontal
						style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
					/> */}
				</View>
				<View>
					<View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Medicine</Text>
					</View>
					{/* <FlatList
						data={resourceBank}
						renderItem={renderItem}
						keyExtractor={item => item?.id}
						horizontal
						style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
					/> */}
				</View>
			</ScrollView>
		</ThemeLayout>
	);
};

export default Statistic;
