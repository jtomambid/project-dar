import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import MapView, { Marker } from "react-native-maps";
import InputField from "../../components/fields/InputField";
import { TextInput } from "react-native-paper";
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../src/configs/firebase";
const Location = () => {
	// const [searchValue, setSearchValue] = useState("");
	const [resourceBank, setResourceBank] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// const [mapFocus, setMapFocus] = useState();

	const getResourceBank = async () => {
		const docRef = collection(db, "resourceBank");
		try {
			const resourceBank = await getDocs(docRef);
			setResourceBank(resourceBank.docs.map(doc => ({ ...doc.data(), id: doc.id })));
			setIsLoading(false);
		} catch (err) {
			console.log("err", err);
		}
	};

	useEffect(() => {
		getResourceBank();
	}, []);

	// useEffect(() => {
	// 	if (searchValue) {
	// 		const searchByName = resourceBank.filter(rb => rb.name.includes(searchValue));
	// 		setMapFocus(searchByName);
	// 	}
	// }, [searchValue]);

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 0,
					position: "absolute",
					zIndex: 99999,
					width: "100%",
					// height: "50%",
				}}>
				<Formik
					initialValues={{
						search: "",
					}}>
					<>
						<ScrollView>
							{/* <InputField
								name="search"
								onBlur={e => setSearchValue(e._dispatchInstances.pendingProps.text)}
								right={<TextInput.Icon icon="magnify" />}
							/> */}
						</ScrollView>
					</>
				</Formik>
			</View>
			{!isLoading && (
				<MapView
					style={styles.map}
					//specify our coordinates.
					initialRegion={{
						latitude: 7.0885,
						longitude: 125.5804,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}>
					{resourceBank &&
						resourceBank?.map(rb => {
							return (
								<Marker
									key={rb?.id}
									coordinate={{ latitude: Number(rb?.latitude), longitude: Number(rb?.longitude) }}
									title={rb?.name}
									tappable={false}
									image={rb?.image}
								/>
							);
						})}
				</MapView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// ...StyleSheet.absoluteFillObject,
		flex: 1, //the container will fill the whole screen.
		// justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default Location;
