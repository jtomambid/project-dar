import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet} from "react-native";
import MAIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Button  from "../../components/_common/Button";
import InputField from "../../components/fields/InputField"
import useKeyboardVisible from "../../src/hooks/useKeyboardVisible";
import * as Yup from "yup";
import { Formik } from "formik";
import { Portal, Snackbar} from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../src/configs/firebase"
import { TextInput } from "react-native-paper";

const texts = {
    invalidEmail: "Email is Invalid!",
    requiredEmail: "Email Address is required!",
    requiredName: "Name is required!",
    requiredPhoneNumber: "Phone Number is required!",
    passwordRequired: "Password is required!",
    signInText: "Sign Up",
    passwordNotMatch: "Password does not match"
  };
  
  
  const validationSchema = Yup.object().shape({
    emailID: Yup.string().email(texts.invalidEmail).required(texts.requiredEmail),
    password: Yup.string().required(texts.passwordRequired),
    phoneNumber: Yup.string().required(texts.requiredPhoneNumber), 
    name: Yup.string().required(texts.requiredName), 
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], texts.passwordNotMatch), 
  });

const Register = () => {
    const navigation = useNavigation();
    const isKeyboardVisible = useKeyboardVisible();
    const auth = getAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [hidePassword, setHidePassword] = useState(true);

  const registerUser = async (values) => {
    setIsSubmitting(true)
    try {
        await createUserWithEmailAndPassword(auth, values.emailID, values.password).then((user) => {
           const newUser = setDoc(doc(db, "users", user.user.uid), {
                uid: user.user.uid,
                name: values.name,
                phoneNumber: values.phoneNumber,
                email: values.emailID,
            })
            setIsSubmitting(false);
         })
    } catch(err) {
        setError(err)
        setIsSubmitting(false);
    }

  }

    return (
        <View style={{height: '100%', backgroundColor: '#fff'}}>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 20, marginVertical: 20}}>
                    <MAIcon name="arrow-back-ios" color="#D9D9D9" size={30} />
                    <Text style={{color: "D9D9D9"}}>Back</Text>
                </View>
            </TouchableOpacity>
            <View style={{paddingHorizontal: 40, justifyContent: 'center',  alignSelf:'center'}}>
                <Image source={require("../../assets/DAR.png")}/>
            </View>
            <ScrollView>
                <View style={{paddingHorizontal: 40}}>
                    <Text style={{fontWeight: 'bold', color: '#000', fontSize: 19}}>New here? Welcome to Dar!</Text>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 40, marginBottom: 20}}>
                    <Text style={{color: '#000', fontSize: 12}}>Create an account. </Text>
                    <Text style={{fontWeight: 'bold', color: '#000', fontSize: 12}}>As donor </Text>
                    <Text style={{color: '#000', fontSize: 12}}>please fill in the fields to continue.</Text>
                </View>
                <KeyboardAvoidingView behavior="padding">
                    <Formik
                        initialValues={{
                            name: "",
                            phoneNumber: "",
                            emailID: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        onSubmit={values => {
                            registerUser(values);
                        }} 
                        validationSchema={validationSchema}>
                        {({ handleSubmit }) => (
                        <>
                            <ScrollView style={{paddingHorizontal: 20}}>
                                <InputField style={styles.textInput} name="name" label="Full Name"/>
                                <InputField style={styles.textInput} name="phoneNumber" label="Phone Number" keyboardType="phone-pad" maxLength={11}/>
                                <InputField style={styles.textInput} name="emailID" label="Email Address"/>
                                <InputField 
                                    name="password"
                                    label="Password"
                                    secureTextEntry={hidePassword}
                                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                                    style={styles.textInput}
                                />
                                <InputField 
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    secureTextEntry={hidePassword}
                                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                                    style={styles.textInput}
                                />
                                <Button
                                    styles={{marginTop: 10}}
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                    onPress={handleSubmit}>
                                    <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>{texts.signInText}</Text>
                                </Button>
                                <View style={{justifyContent: 'center', paddingHorizontal: 100, marginVertical: 20}}>
                                    <Text style={{fontSize: 12, textAlign: 'center'}}>By using Dar, you agree to Dar's Terms of Use and Privacy Policy</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      // flex:1,
      // flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
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
  });

export default Register;