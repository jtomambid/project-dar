import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	StyleSheet,
} from "react-native";
import MAIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/_common/Button";
import InputField from "../../components/fields/InputField";
import useKeyboardVisible from "../../src/hooks/useKeyboardVisible";
import * as Yup from "yup";
import { Formik } from "formik";
import { Portal, Snackbar } from "react-native-paper";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Modal from "../../components/_common/Modal";

const texts = {
	invalidEmail: "Email is Invalid!",
	requiredEmail: "Email Address is required!",
	signInText: "Send Instructions",
};

const validationSchema = Yup.object().shape({
	emailID: Yup.string().email(texts.invalidEmail).required(texts.requiredEmail),
});

const Reset = () => {
	const navigation = useNavigation();
	const isKeyboardVisible = useKeyboardVisible();
	const auth = getAuth();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState();
	const [visible, setVisible] = useState(false);

	const sendResetPassword = async values => {
		setIsSubmitting(true);
		try {
			await sendPasswordResetEmail(auth, values.emailID).then(() => {
				setVisible(true);
				setIsSubmitting(false);
				setTimeout(function () {
					setVisible(false);
					navigation.navigate("Login");
				}, 5000);
			});
		} catch (err) {
			if (err?.code === "auth/user-not-found") {
				setVisible(true);
				setTimeout(function () {
					setVisible(false);
					navigation.navigate("Login");
				}, 5000);
			} else {
				setError(err);
			}
			setIsSubmitting(false);
		}
	};

	return (
		<View style={{ height: "100%", backgroundColor: "#fff" }}>
			<TouchableOpacity onPress={() => navigation.replace("Login")}>
				<View style={{ flexDirection: "row", alignItems: "center", padding: 20, marginVertical: 20 }}>
					<MAIcon name="arrow-back-ios" color="#D9D9D9" size={30} />
					<Text style={{ color: "D9D9D9" }}>Back</Text>
				</View>
			</TouchableOpacity>
			<View style={{ paddingHorizontal: 40, justifyContent: "center", alignSelf: "center" }}>
				<Image source={require("../../assets/DAR.png")} />
			</View>
			<ScrollView>
				<View style={{ paddingHorizontal: 40, marginVertical: 20 }}>
					<Text style={{ fontWeight: "bold", color: "#000", fontSize: 19 }}>Reset Password</Text>
				</View>
				<View style={{ flexDirection: "row", paddingHorizontal: 40, marginBottom: 20 }}>
					<Text style={{ color: "#000", fontSize: 12 }}>
						Enter the email address associated with your account and we’ll send an email with instructions to reset your
						password.
					</Text>
				</View>
				<KeyboardAvoidingView behavior="padding">
					<Formik
						initialValues={{
							emailID: "",
						}}
						onSubmit={values => {
							sendResetPassword(values);
						}}
						validationSchema={validationSchema}>
						{({ handleSubmit }) => (
							<>
								<ScrollView style={{ paddingHorizontal: 20 }}>
									<InputField style={styles.textInput} name="emailID" label="Email Address" />
									<Button
										styles={{ marginTop: 10 }}
										loading={isSubmitting}
										disabled={isSubmitting}
										onPress={handleSubmit}>
										<Text style={[styles.buttonText, { fontWeight: "bold" }]}>{texts.signInText}</Text>
									</Button>
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
			{!isKeyboardVisible && (
				<View style={{ justifyContent: "center", paddingHorizontal: 100, marginVertical: 20 }}>
					<Text style={{ fontSize: 12, textAlign: "center" }}>
						By using Dar, you agree to Dar's Terms of Use and Privacy Policy
					</Text>
				</View>
			)}
			<Modal
				visible={visible}
				dismissable={false}
				onDismiss={() => setVisible(false)}
				contentContainerStyle={styles.modalContainer}>
				<Text style={styles.modalTitleText}>Check your mail</Text>
				<Text style={styles.modalBodyText}>We have sent a password recovery insturctions to your email</Text>
				<Text style={styles.modalBodyDisclaimer}>Please check the spam if you didn't receive an email.</Text>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex:1,
		// flexDirection:'row',
		alignItems: "center",
		justifyContent: "center",
	},
	textInput: {
		marginHorizontal: 20,
		marginVertical: 10,
	},
	button: {
		marginHorizontal: 20,
		borderRadius: 15,
		marginVertical: 10,
		height: 44,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		height: "25%",
		margin: 20,
	},
	modalTitleText: {
		fontSize: 19,
		textAlign: "center",
		color: "#35343D",
		fontWeight: "bold",
		paddingHorizontal: 90,
		marginBottom: 30,
	},
	modalBodyText: {
		fontSize: 15,
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
});

export default Reset;
