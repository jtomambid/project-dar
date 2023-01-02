import { StyleSheet } from "react-native";
import React from "react";
import { Button as RNPButton } from "react-native-paper";

const Button = ({
    onPress,
    children,
    mode = "contained",
    styles,
    disabled,
    ...rest
}) => {
    const btnProps = {
        mode,
        style: { ...componentStyles.button, ...styles },
        onPress,
        color: disabled ? "red" : "#25338B",
        disabled,
        ...rest,
    };

    return (
        <RNPButton {...btnProps}>{children}</RNPButton>
    )
}

export default Button;

const componentStyles = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginHorizontal: 24,
        backgroundColor: "#196332",
        padding: 3,
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 15,
    },
});