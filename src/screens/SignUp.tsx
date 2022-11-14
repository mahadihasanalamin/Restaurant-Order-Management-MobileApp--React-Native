import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { TextButton, TextField } from "../components";
// import * as Animatable from "react-native-animatable";

import { RootStackParamList } from "../navigation/NavigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// import { debounce } from "lodash";
import { scale, ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { authentication, db } from "../database/Firebase";
import { doc, setDoc } from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList>;
const { height, width } = Dimensions.get("screen");

const SignUp: FC<Props> = ({ navigation }) => {
  ////////////////////////////////////////////////////////////
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const Validate = () => {
    Keyboard.dismiss();
    let valid = true;
    /////////////name
    if (!inputs.name) {
      handleError("Please Enter Your Name", "name");
      valid = false;
    } else if (Number(inputs.name)) {
      handleError("Name must be alphabetic characters", "name");
      valid = false;
    } else if (inputs.name.length < 5 || inputs.name.length > 20) {
      handleError("Name should be atleast 5 characters", "name");
      valid = false;
    } else {
      handleError("", "name");
      valid = true;
    }
    /////////////phone
    if (!inputs.phone) {
      handleError("Please Enter Your Phone Number", "phone");
      valid = false;
    } else if (isNaN(Number(inputs.phone))) {
      handleError("Phone Number must be numeric", "phone");
      valid = false;
    } else if (inputs.phone.length < 11 || inputs.phone.length > 11) {
      handleError("Phone number must be 11 digits", "phone");
      valid = false;
    } else {
      handleError("", "phone");
      valid = true;
    }
    /////////////email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!inputs.email) {
      handleError("Please Enter Your Email", "email");
      valid = false;
    } else if (reg.test(inputs.email) == false) {
      handleError("Invalid email address", "email");
      valid = false;
    } else {
      handleError("", "email");
      valid = true;
    }
    /////////////password
    if (!inputs.password) {
      handleError("Please Enter Your Password", "password");
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError("Password should be atleast 6 characters", "password");
      valid = false;
    } else {
      handleError("", "password");
      valid = true;
    }
    //confirm password
    if (!inputs.cpassword) {
      handleError("Please Confirm Your Password", "cpassword");
      valid = false;
    } else if (inputs.cpassword !== inputs.password) {
      handleError("Password and confirm password does not match", "cpassword");
    } else {
      handleError("", "cpassword");
      valid = true;
    }

    if (valid) {
      Register();
    }
  };

  const handleError = (errorMessage: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  ////////////////////////////////////////////////////////

  const Register = async () => {
    createUserWithEmailAndPassword(
      authentication,
      inputs.email,
      inputs.password
    )
      .then((response) => {
        sendEmailVerification(response.user);
        Alert.alert(
          "Verify your email address",
          "A Verification link has been sent to your email account"
        );
        setDoc(doc(db, "Users", response.user.uid), {
          name: inputs.name,
          image: "",
          // address: [],
          email: inputs.email,
          phone: inputs.phone,
          // password: inputs.password,
          userType: "customer",
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        //
      })
      .catch((error) => {
        console.log(error);
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          handleError("Invalid email address", "email");
        } else if (
          error.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          handleError("Email already exists", "email");
        }
        if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          handleError("Password should be at least 6 characters", "password");
        }
      });
  };

  return (
    <View>
      <AppBackground />
      <ScrollView>
        <View style={Styles.container}>
          <Text style={Styles.signUp}>Sign up</Text>
          <TextField
            label="Name"
            onChangeText={(text) => handleInputs(text, "name")}
            error={errors.name}
          />

          <TextField
            label="Phone Number"
            onChangeText={(text) => handleInputs(text, "phone")}
            error={errors.phone}
          />

          <TextField
            label="Email"
            onChangeText={(text) => handleInputs(text, "email")}
            error={errors.email}
          />

          <TextField
            label="Password"
            onChangeText={(text) => handleInputs(text, "password")}
            secureTextEntry
            error={errors.password}
          />

          <TextField
            label="Confirm Password"
            onChangeText={(text) => handleInputs(text, "cpassword")}
            secureTextEntry
            error={errors.cpassword}
          />

          <TextButton text="Sign up" type="long" onPress={Validate} />
          <Text style={Styles.or}>or</Text>

          <View style={Styles.logo}>
            <TouchableOpacity>
              <Image
                style={[Styles.icon, { marginRight: scale(25) }]}
                source={require("../../assets/icons/facebook.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={Styles.icon}
                source={require("../../assets/icons/google.png")}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: scale(24),
              marginTop: scale(20),
            }}
          >
            <Text style={{ color: "#A9A9A9", marginRight: scale(15) }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={{ color: "#B22222" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const Styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: "20%",
  },
  errorMessage: {
    color: "#D0342C",
    fontWeight: "bold",
    marginHorizontal: 10,
    width: width / 1.2,
    marginVertical: -10,
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  or: {
    color: "#A9A9A9",
    alignSelf: "center",
    marginBottom: "16@s",
    marginTop: "30@s",
  },
  icon: {
    resizeMode: "contain",
    height: "40@s",
    width: "40@s",
    marginVertical: 12,
  },
  signUp: {
    color: "#F0F5F9",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: scale(45),
    alignSelf: "center",
  },
});
