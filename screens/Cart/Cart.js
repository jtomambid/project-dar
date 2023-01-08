import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from "react-native";
import MAIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/_common/Button";
import { Portal, Snackbar } from "react-native-paper";
import Modal from "../../components/_common/Modal";
import ENIcons from "react-native-vector-icons/Entypo";
import useAppContext from "../../src/context/useAppContext";
import { doc, getDoc, addDoc, collection, getDocs, set } from "firebase/firestore";
import { db } from "../../src/configs/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const datas = [
	{
		id: 1,
		name: "test1",
		resourceBank: "test",
	},
	{
		id: 2,
		name: "test2",
		resourceBank: "test",
	},
	{
		id: 3,
		name: "test3",
		resourceBank: "test",
	},
	{
		id: 4,
		name: "test4",
		resourceBank: "Matina",
	},
];

const Cart = () => {
	const auth = getAuth();
	const [error, setError] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState(datas);
	const [currentUser, setCurrentUser] = useState();

	const { setCart, cart } = useAppContext();

	console.log("cart", cart);
	const checkout = async () => {
		if (cart.length < 1 || cart.length > 3) {
			setError({ message: "Maximum of 3 items only." });
		} else {
			setIsSubmitting(true);
			try {
				cart.forEach(c => {
					const recipient = addDoc(collection(db, "recipient"), {
						recipient: currentUser?.uid,
						recipientName: currentUser?.name,
						resourceBankName: c.resourceBankName,
						donationItemID: c.id,
						donationName: c.label,
					});
				});
				setIsSubmitting(false);
				setVisible(true);
			} catch (err) {
				setError(err);
				setIsSubmitting(false);
			}
		}
	};

	console.log("currentUser", currentUser);

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

	const submitDonation = async values => {
		if (selectedResourceBank) {
			setIsSubmitting(true);
			try {
				const recipient = await addDoc(collection(db, "recipient"), {
					recipient: currentUser?.uid,
					recipientName: currentUser?.name,
					resourceBankName: values.resourceBankName,
					donationItemID: values.id,
					donationName: values.label,
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

	const removeItem = item => {
		const newItem = cart.filter(d => {
			return item.id !== d.id;
		});
		setCart(newItem);
	};

	useEffect(() => {
		getData();
	}, []);

	const navigation = useNavigation();
	return (
		<View style={{ height: "100%", backgroundColor: "#fff" }}>
			<TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
				<View style={{ flexDirection: "row", alignItems: "center", padding: 20, marginVertical: 20 }}>
					<MAIcon name="arrow-back-ios" color="#D9D9D9" size={30} />
					<Text style={{ color: "D9D9D9" }}>Back</Text>
				</View>
			</TouchableOpacity>
			<View style={{ paddingHorizontal: 40, justifyContent: "center", alignSelf: "center", marginVertical: 10 }}>
				<Image source={require("../../assets/bag.png")} />
			</View>
			<View style={{ marginVertical: 20, marginHorizontal: 50, justifyContent: "space-around", flexDirection: "row" }}>
				<Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>Item Name</Text>
				<Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>Pickup Place</Text>
			</View>
			<FlatList
				data={cart}
				width="100%"
				// extraData={data}
				keyExtractor={(item, index) => `${item.label}-${index}`}
				// ItemSeparatorComponent={this.FlatListItemSeparator}
				ListEmptyComponent={
					<View style={{ justifyContent: "center", flex: 1 }}>
						<Text style={{ textAlign: "center" }}>Cart is empty..</Text>
					</View>
				}
				renderItem={({ item }) => (
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
									alignItems: "center",
								}}>
								<View>
									<Text style={{ fontWeight: "normal", fontSize: 16 }}>{item.label}</Text>
								</View>
								<View style={{ width: "50%" }}>
									<Text style={{ textAlign: "center", fontWeight: "normal", fontSize: 16 }}>
										{item.resourceBankName}
									</Text>
								</View>
							</View>
							<TouchableOpacity
								style={{ position: "absolute", top: 0, right: 0, justifyContent: "flex-end", alignItems: "flex-end" }}>
								<MAIcon name="close" color="red" size={20} onPress={() => removeItem(item)} />
							</TouchableOpacity>
						</View>
					</ScrollView>
				)}
			/>
			{data?.length > 0 && (
				<View style={{ alignSelf: "center" }}>
					<Button
						style={{
							marginHorizontal: 20,
							borderRadius: 10,
							marginVertical: 20,
							height: 44,
							backgroundColor: "#196332",
							justifyContent: "center",
						}}
						onPress={() => checkout()}>
						<Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>Checkout</Text>
					</Button>
				</View>
			)}
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
				contentContainerStyle={{ backgroundColor: "#fff", borderRadius: 10, margin: 20, padding: 20 }}>
				<ENIcons style={{ textAlign: "center" }} name="check" size={100} color="#000000" />
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						textAlign: "center",
						color: "#35343D",
						paddingHorizontal: 50,
						marginBottom: 30,
					}}>
					Your request has been processed.
				</Text>
				<View style={{ alignSelf: "center" }}>
					<Button
						loading={isSubmitting}
						disabled={isSubmitting}
						onPress={() => {
							setVisible(false);
							setCart([]);
							navigation.navigate("Dashboard");
						}}>
						<Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>Back to Home Screen</Text>
					</Button>
				</View>
			</Modal>
		</View>
	);
};

export default Cart;
