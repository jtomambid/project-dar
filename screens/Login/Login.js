import React, { useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Button  from "../../components/_common/Button";
import InputField from "../../components/fields/InputField"
import useKeyboardVisible from "../../src/hooks/useKeyboardVisible";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FirebaseError } from "firebase/app";

const texts = {
  invalidEmail: "Email is Invalid!",
  requiredEmail: "Email Address is required!",
  passwordRequired: "Password is required!",
  signInText: "Sign In",
  forgotPasswordText: "Forgot your password?"
};


const validationSchema = Yup.object().shape({
  emailID: Yup.string().email(texts.invalidEmail).required(texts.requiredEmail),
  password: Yup.string().required(texts.passwordRequired),
});

const Login = () => {

  const isKeyboardVisible = useKeyboardVisible();
  const auth = getAuth();
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [hidePassword, setHidePassword] = useState(true);

  
  return (
    <View style={{ height: '100%'}}>
       <KeyboardAvoidingView behavior="padding">
          <Formik
            initialValues={{
            emailID: "",
            password: "",
            }}
            onSubmit={values => {
              setIsSubmitting(true);
              signInWithEmailAndPassword(auth, values.emailID, values.password)
                .then(() => {
                  setIsSubmitting(false);
                })
                .catch((error) => {
                  setError(error)
                  setIsSubmitting(false);
                })
            }}
            validationSchema={validationSchema}>
            {({ handleSubmit }) => (
            <>
              <ScrollView>
                <View style={styles.container}>
                <Image source={require("../../assets/logo_login.png")} />
                </View>
                <InputField name="emailID" label="Email Address" style={styles.textInput}/>
                <InputField 
                  name="password"
                  label="Password"
                  right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                  secureTextEntry={hidePassword}
                  style={styles.textInput}
                />
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Reset")}>
                  <Text 
                    style={{marginBottom: 20, marginHorizontal: 20, marginTop: 5, textAlign: "right", color: "#196332", fontWeight: 'bold'}}>{texts.forgotPasswordText}</Text>
                </TouchableWithoutFeedback>
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onPress={handleSubmit}>
                  <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>{texts.signInText}</Text>
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
      {!isKeyboardVisible && (
      <View style={{position: 'absolute', bottom: 0, width: '100%', height: "-90%", justifyContent: 'center', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{marginRight: 5, fontWeight: 'bold'}}>{"Create an account?"}</Text>
            <Text style={{color: '#196332', fontWeight: 'bold'}}>{"Sign up"}</Text>
          </View>
        </TouchableWithoutFeedback>
      <View style={{backgroundColor: '#196332', width: '100%', height: 55, borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
      </View>
    )}
    </View>
   
  
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 20,
    alignItems:'center',
    justifyContent:'center'
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 5,
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
