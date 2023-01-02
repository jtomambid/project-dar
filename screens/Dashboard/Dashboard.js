import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	FlatList,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import ThemeLayout from "../../components/layout/ThemeLayout";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../src/configs/firebase";
import { doc, getDoc, onSnapshot, collection, getDocs, where, query } from "firebase/firestore";
import * as Yup from "yup";
import { Formik } from "formik";
import SelectField from "../../components/fields/SelectField";
import { Portal, Snackbar, TextInput } from "react-native-paper";
import Button from "../../components/_common/Button";

const Dashboard = () => {
	const auth = getAuth();
	const navigation = useNavigation();

	const [resourceBank, setResourceBank] = useState();
	const [foods, setFoods] = useState();
	const [medicines, setMedicines] = useState();
	const [error, setError] = useState();

	const [donationMedicineVal, setDonationMedicineVal] = useState();
	const [donationFoodVal, setDonationFoodVal] = useState();

	const [donationFood, setDonationFood] = useState();
	const [donationMedicine, setDonationMedicine] = useState();

	const [currentUser, setCurrentUser] = useState();
	const [selectedResourceBank, setSelectedResourceBank] = useState();

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

	const getDonationFood = async () => {
		const docRef = collection(db, "donations");
		try {
			const donationFood = query(
				docRef,
				where("resourceBank", "==", selectedResourceBank.id),
				where("donationType", "==", "Food"),
			);
			const getFood = await getDocs(donationFood);
			setDonationFood(
				getFood.docs.map(doc => ({ id: doc.id, label: doc.data().donationItem, value: doc.data().donationItem })),
			);
		} catch (err) {
			setError(err);
		}
	};

	const getDonationMedicine = async () => {
		const docRef = collection(db, "donations");
		try {
			const donationMedicine = query(
				docRef,
				where("resourceBank", "==", selectedResourceBank.id),
				where("donationType", "==", "Medicine"),
			);
			const getMedicine = await getDocs(donationMedicine);
			setDonationMedicine(
				getMedicine.docs.map(doc => ({ id: doc.id, label: doc.data().donationItem, value: doc.data().donationItem })),
			);
		} catch (err) {
			setError(err);
		}
	};

	console.log("donationMedicine", donationMedicine);

	const renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => setSelectedResourceBank(item)}>
			<Image
				key={item.id}
				source={{ uri: item?.image }}
				style={[
					item?.id === selectedResourceBank?.id ? styles.selectedResourcebank : "",
					{ width: 150, height: 150, resizeMode: "contain" },
				]}
			/>
		</TouchableOpacity>
	);

	const getResourceBank = async () => {
		const docRef = collection(db, "resourceBank");
		try {
			const resourceBank = await getDocs(docRef);
			setResourceBank(resourceBank.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};

	// const getFoods = async () => {
	// 	const docRef = collection(db, "foods");
	// 	try {
	// 		const foods = await getDocs(docRef);
	// 		setFoods(foods.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	// 	} catch (err) {
	// 		console.log("err", err);
	// 	}
	// };

	// const getMedicines = async () => {
	// 	const docRef = collection(db, "medicine");
	// 	try {
	// 		const medicines = await getDocs(docRef);
	// 		setMedicines(medicines.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	// 	} catch (err) {
	// 		console.log("err", err);
	// 	}
	// };
	useEffect(() => {
		getResourceBank();
		// getFoods();
		// getMedicines();
		getData();
	}, []);

	useEffect(() => {
		if (selectedResourceBank) {
			getDonationFood();
			getDonationMedicine();
		}
	}, [selectedResourceBank]);

	return (
		<ThemeLayout headerTitle={"Welcome to Dar!"}>
			<ScrollView style={{ marginHorizontal: 20 }} contentContainerStyle={{ height: "100%" }}>
				<KeyboardAvoidingView behavior="padding">
					{/* <View>
					<View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Food</Text>
					</View>
					<FlatList
						data={foods}
						renderItem={renderItem}
						keyExtractor={item => item?.id}
						horizontal
						style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
					/>
				</View>
				<View>
					<View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Medicine</Text>
					</View>
					<FlatList
						data={medicines}
						renderItem={renderItem}
						keyExtractor={item => item?.id}
						horizontal
						style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
					/>
				</View> */}
					<View>
						{/* <View>
						<Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>Resource Bank</Text>
					</View> */}
						<FlatList
							data={resourceBank}
							renderItem={renderItem}
							keyExtractor={item => item?.id}
							horizontal
							style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
						/>
					</View>
					<Formik
						initialValues={{
							food: "",
							medicine: "",
						}}
						onSubmit={values => {}}>
						{({ handleSubmit }) => (
							<>
								<ScrollView>
									<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
										<Text style={{ fontSize: 12, fontStyle: "italic" }}>
											Disclaimer: Please be informed that each Beneficiary have only three (3) chances of item to avail.
										</Text>
									</View>
									<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
										<Text style={{ fontWeight: "bold", fontSize: 15 }}>Available Food and Medicine</Text>
									</View>
									<View style={{ marginBottom: 20 }}>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Food</Text>
										<SelectField
											name="food"
											items={donationFood}
											onValueChange={e => setDonationFoodVal(e)}
											style={styles.textInput}
										/>
									</View>
									<View style={{ marginBottom: 20 }}>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Medicine</Text>
										<SelectField
											name="medicine"
											items={donationMedicine}
											onValueChange={e => setDonationMedicineVal(e)}
											style={styles.textInput}
										/>
									</View>
									<View style={{ alignSelf: "center" }}>
										<Button style={styles.button}>
											<Text style={[styles.buttonText, { fontWeight: "bold" }]}>Submit</Text>
										</Button>
									</View>
									<Portal>
										<Snackbar
											visible={error}
											onDismiss={() => {
												setError(null);
											}}
											action={{
												label: "Close",
												onPress: () => {
													setError(null);
												},
											}}>
											{error?.message}
										</Snackbar>
									</Portal>
								</ScrollView>
							</>
						)}
					</Formik>
				</KeyboardAvoidingView>
			</ScrollView>
		</ThemeLayout>
	);
};

const styles = StyleSheet.create({
	selectedResourcebank: {
		borderWidth: 1,
		borderColor: "#00FE1E",
		borderRadius: 15,
	},
	button: {
		marginHorizontal: 20,
		borderRadius: 10,
		marginVertical: 20,
		height: 44,
		backgroundColor: "#196332",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});

export default Dashboard;
