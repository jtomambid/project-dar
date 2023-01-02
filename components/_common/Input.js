import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";


const Input = ({
    label,
    onChangeText,
    mode = "outlined",
    theme = { roundness : 20 },
    style,
    ...rest
}) => {
    return (
        <View>
            <TextInput
            label={label}
            mode={mode}
            theme={theme}
            onChangeText={onChangeText}
            style={{ ...styles.textInput, ...style }}
            {...rest}
            />
      </View>
    );
}

export default Input;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 20,
  },
});
