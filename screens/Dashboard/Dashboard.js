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
import useAppContext from "../../src/context/useAppContext";

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
	const [foodAndMedicine, setFoodAndMedicine] = useState();

	const [currentUser, setCurrentUser] = useState();
	const [selectedResourceBank, setSelectedResourceBank] = useState();

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

	const getDonationFood = async () => {
		setFoodAndMedicine([]);
		const docRef = collection(db, "donations");
		try {
			const donationFood = query(docRef, where("resourceBank", "==", selectedResourceBank.id));

			const getFood = await getDocs(donationFood);
			const food = getFood.docs.map(doc => ({
				id: doc.id,
				label: doc.data().donationItem,
				value: doc.id,
				resourceBank: doc.data().resourceBank,
				resourceBankName: doc.data()?.resourceBankName,
			}));

			setFoodAndMedicine(food);
		} catch (err) {
			setError(err);
		}
	};

	const getAllDonation = async () => {
		const docRef = collection(db, "donations");
		try {
			const donationFood = query(docRef, where("resourceBank", "==", selectedResourceBank.id));

			const getFood = await getDocs(donationFood);
			const food = getFood.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setFoods(food);
		} catch (err) {
			setError(err);
		}
	};

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

	useEffect(() => {
		getResourceBank();
		getData();
	}, []);

	useEffect(() => {
		if (selectedResourceBank) {
			getDonationFood();
			getAllDonation();
		}
	}, [selectedResourceBank]);

	const addToCart = values => {
		console.log("values", values);
		const donation = foodAndMedicine.find(fm => fm.id === values.food);
		console.log("fm", foodAndMedicine);
		console.log("donation", donation);
		setCart([...cart, donation]);
	};

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

	const renderDashboardResourceBank = () => {
		return (
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
		);
	};

	const renderDashboardDonor = () => {
		return (
			<ScrollView style={{ marginHorizontal: 20 }} contentContainerStyle={{ height: "100%" }}>
				<KeyboardAvoidingView behavior="padding">
					<View>
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
							// medicine: "",
						}}
						onSubmit={values => {
							addToCart(values);
						}}>
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
										{/* <Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Food</Text> */}
										<SelectField
											name="food"
											items={foodAndMedicine}
											onValueChange={e => setDonationFoodVal(e)}
											style={styles.textInput}
										/>
									</View>
									{/* <View style={{ marginBottom: 20 }}>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Medicine</Text>
										<SelectField
											name="medicine"
											items={donationMedicine}
											onValueChange={e => setDonationMedicineVal(e)}
											style={styles.textInput}
										/>
									</View> */}
									<View style={{ alignSelf: "center" }}>
										<Button style={styles.button} onPress={handleSubmit}>
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
		);
	};

	return (
		<ThemeLayout headerTitle={"Welcome to Dar!"}>
			{currentUser?.role === "donor" ? renderDashboardDonor() : renderDashboardResourceBank()}
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
