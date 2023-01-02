import { useFormikContext } from "formik";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { HelperText, Text } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import ENIcon from "react-native-vector-icons/Entypo";

const SelectDateField = ({ label, style, name, onValueChange, value }) => {
	const context = useFormikContext();

	if (context === undefined) {
		throw new Error("Field is used outside of the context of a formik wrapper");
	}

	const error = context?.errors[name];
	const touched = context?.touched[name];

	const HAS_ERROR = Boolean(error && touched);

	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	return (
		<View style={[styles.selectContainer, style]}>
			<View style={[styles.labelContainer]}>
				<Text style={[styles.labelText]}>{label}</Text>
			</View>
			<TouchableOpacity onPress={() => setShow(true)}>
				<View style={styles.innerContainer}>
					<Text style={{}}>{date?.toISOString().slice(0, 10)}</Text>
					<ENIcon name="chevron-down" size={30} color="#000000" />
				</View>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					onChange={(event, _val) => {
						setDate(_val);
						setShow(false);

						if (onValueChange) {
							onValueChange(_val?.toISOString().slice(0, 10));
						}
					}}
					value={date}
					testID="dateTimePicker"
					display="default"
				/>
			)}
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
		borderColor: "#B3B5B4",
		borderWidth: 1,
		borderRadius: 15,
		height: 55,
		justifyContent: "space-between",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
	},
	labelContainer: {
		// backgroundColor: "#D9D9D9",
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
		borderRadius: 15,
	},
	errorText: {
		backgroundColor: "#fff",
	},
});

export default SelectDateField;
