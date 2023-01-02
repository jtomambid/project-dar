import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { HelperText, TextInput } from "react-native-paper";

const InputField = ({
    label, 
    name, 
    value, 
    onChangeText, 
    mode="outlined", 
    theme={roundness : 10}, 
    style, 
    ...rest
}) => {
    const context = useFormikContext();

    if (context === undefined) { 
      throw new Error("Field is used outside of the context of a formik wrapper");
    }
    
    const error = context?.errors[name];
    const touched = context?.touched[name];
    const val = value || context?.values[name];

    const HAS_ERROR = error && touched;

    return (
        <View>
            <TextInput
                label={label}
                mode={mode}
                theme={theme}
                outlineColor="#B3B5B4"
                activeOutlineColor="#196332"
                onChangeText={text => {
                    context.setFieldValue(name, text);

                    if (onChangeText) {
                    onChangeText(text);
                    }
                }}
                onBlur={context.handleBlur(name)}
                style={{ ...styles.textInput, ...style }}
                value={val}
                error={HAS_ERROR}
                {...rest}
            />
            {HAS_ERROR && (
            <HelperText type="error" style={{marginHorizontal: 17}} visible={HAS_ERROR}>
                {error}
            </HelperText>
            )}
        </View>
    );
}

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 17,
    backgroundColor: "#D9D9D9",
  },
});