import React, { useState, useEffect } from "react";
import ThemeLayout from "../../components/layout/ThemeLayout";
import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Button from "../../components/_common/Button";
import InputField from "../../components/fields/InputField";
import useKeyboardVisible from "../../src/hooks/useKeyboardVisible";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FirebaseError } from "firebase/app";
import SelectField from "../../components/fields/SelectField";
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../src/configs/firebase";
import { getOptionValue } from "../../src/helpers/utils";
import SelectDateField from "../../components/fields/SelectDateField";
import Modal from "../../components/_common/Modal";
import ENIcons from "react-native-vector-icons/Entypo";

const texts = {
	requiredDonationItem: "Donation Item Name is required",
	requiredDonationType: "Donation Type is required!",
	submitText: "Submit",
	requiredQuantity: "Quantity is required",
	minQuantity: "Minimum quantity is 0",
	requiredExpirationDate: "Expiration Date is required",
};

const validationSchema = Yup.object().shape({
	donationItem: Yup.string().required(texts.requiredDonationItem),
	donationType: Yup.string().required(texts.requiredDonationType),
	quantity: Yup.string().required(texts.requiredQuantity).min(0, texts.minQuantity),
	// expirationDate: Yup.string().required(texts.requiredExpirationDate),
});

const Donate = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();
	const [donationTypeItems, setDonationTypeItems] = useState();
	const [donationType, setDonationType] = useState();
	const [expirationDate, setExpirationDate] = useState();
	const [resourceBank, setResourceBank] = useState();
	const [visible, setVisible] = useState(false);
	const [selectedResourceBank, setSelectedResourceBank] = useState();

	const navigation = useNavigation();

	const getDonationType = async () => {
		const docRef = collection(db, "donationType");
		try {
			const donationTypeItems = await getDocs(docRef);
			setDonationTypeItems(donationTypeItems.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		} catch (err) {
			console.log("err", err);
		}
	};

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
		getDonationType();
		getResourceBank();
	}, []);

	const submitDonation = async values => {
		if (selectedResourceBank) {
			setIsSubmitting(true);
			try {
				const newDonation = await addDoc(collection(db, "donations"), {
					resourceBank: selectedResourceBank.id,
					resourceBankName: selectedResourceBank.name,
					donationItem: values.donationItem,
					donationType: values.donationType,
					expirationDate: expirationDate ? expirationDate : new Date().toISOString().slice(0, 10),
					quantity: values.quantity,
				});
				setIsSubmitting(false);
				setVisible(true);
			} catch (err) {
				setError(err);
				setIsSubmitting(false);
			}
		} else {
			setError({ message: "No Selected Resource Bank" });
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

	return (
		<ThemeLayout headerTitle={"Donate"}>
			<ScrollView>
				<KeyboardAvoidingView behavior="padding">
					<Formik
						initialValues={{
							donationItem: "",
							donationType: "Medicine",
							quantity: "",
							expirationDate: "",
						}}
						onSubmit={(values, { resetForm }) => {
							submitDonation(values);
							resetForm();
						}}
						validationSchema={validationSchema}>
						{({ handleSubmit }) => (
							<>
								<ScrollView>
									<View style={{ marginHorizontal: 20 }}>
										<FlatList
											data={resourceBank}
											renderItem={renderItem}
											keyExtractor={item => item?.id}
											horizontal
											style={{ backgroundColor: "#F6F3F3", borderRadius: 20, padding: 10 }}
										/>
									</View>
									<View>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Donation Name</Text>
										<InputField name="donationItem" style={styles.textInput} />
									</View>
									<View>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Type</Text>
										<SelectField
											name="donationType"
											items={donationTypeItems}
											onValueChange={e => setDonationType(e)}
											style={styles.textInput}
										/>
									</View>
									<View>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Quantity</Text>
										<InputField name="quantity" style={styles.textInput} keyboardType="number-pad" />
									</View>
									<View>
										<Text style={{ paddingHorizontal: 20, fontSize: 16 }}>Expiration Date</Text>
										<SelectDateField
											name="expirationDate"
											onValueChange={e => setExpirationDate(e)}
											style={{ marginHorizontal: 20, marginVertical: 5 }}
										/>
									</View>
									<View style={{ alignSelf: "center" }}>
										<Button style={styles.button} loading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit}>
											<Text style={[styles.buttonText, { fontWeight: "bold" }]}>{texts.submitText}</Text>
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
									<Modal
										visible={visible}
										dismissable={false}
										onDismiss={() => setVisible(false)}
										contentContainerStyle={styles.modalContainer}>
										<ENIcons style={styles.modalTitleText} name="check" size={100} color="#000000" />
										<Text style={styles.modalBodyText}>Transaction Complete!</Text>
										<View style={{ alignSelf: "center" }}>
											<Button
												loading={isSubmitting}
												disabled={isSubmitting}
												onPress={() => {
													setVisible(false);
													navigation.navigate("Dashboard");
												}}>
												<Text style={[styles.buttonText, { fontWeight: "bold" }]}>Back to Home Screen</Text>
											</Button>
										</View>
									</Modal>
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
	container: {
		marginTop: 50,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	textInput: {
		marginHorizontal: 20,
		marginVertical: 5,
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
	modalContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		margin: 20,
		padding: 20,
	},
	modalTitleText: {
		textAlign: "center",
	},
	modalBodyText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#35343D",
		paddingHorizontal: 50,
		marginBottom: 30,
	},
	modalBodyDisclaimer: {
		fontSize: 10,
		textAlign: "center",
		color: "#35343D",
		paddingHorizontal: 50,
		marginBottom: 30,
	},
	selectedResourcebank: {
		borderWidth: 1,
		borderColor: "#00FE1E",
		borderRadius: 15,
	},
});

export default Donate;
