import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { HelperText, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const SelectField = ({ items, label, style, name, onValueChange, value }) => {
	const context = useFormikContext();

	if (context === undefined) {
		throw new Error("Field is used outside of the context of a formik wrapper");
	}

	const error = context?.errors[name];
	const touched = context?.touched[name];
	const val = value || context?.values[name];

	const HAS_ERROR = Boolean(error && touched);

	useEffect(() => {
		context.setFieldValue(name, val);
	}, [val]);

	return (
		<View style={[styles.selectContainer, style]}>
			<View style={[styles.labelContainer]}>
				<Text style={[styles.labelText]}>{label}</Text>
			</View>
			<View style={styles.innerContainer}>
				<Picker
					onValueChange={_val => {
						context.setFieldValue(name, _val);

						if (onValueChange) {
							onValueChange(_val);
						}
					}}
					selectedValue={val}>
					{items?.map(items => {
						return <Picker.Item key={items?.id} label={items?.label} value={items?.value} />;
					})}
				</Picker>
			</View>
			{HAS_ERROR && (
				<HelperText type="error" style={styles.errorText} visible={HAS_ERROR}>
					{error}
				</HelperText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	selectContainer: {
		marginHorizontal: 17,
		backgroundColor: "#D9D9D9",
		borderRadius: 15,
	},
	innerContainer: {
		borderColor: "#D9D9D9",
		borderWidth: 1,
		borderRadius: 15,
	},
	labelContainer: {
		// backgroundColor: "#fff",
		zIndex: 2,
		position: "absolute",
		width: 80,
		left: 12,
		top: -8,
	},
	labelText: {
		textAlign: "center",
		color: "#5F5D70",
		fontSize: 12,
	},
	errorText: {
		backgroundColor: "#fff",
	},
});

export default SelectField;
