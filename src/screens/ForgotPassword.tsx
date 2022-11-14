import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";
import React, { FC, useState } from "react";
import { Alert, Dimensions, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { TextButton, TextField } from "../components";
import { authentication } from "../database/Firebase";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseUserStore } from "../zustand/UserStore";

type Props = NativeStackScreenProps<RootStackParamList>;
const { height, width } = Dimensions.get("screen");

const ForgotPassword: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const userStore = UseUserStore();

  const SendVerification = async () => {
    console.log(email);
    await sendPasswordResetEmail(authentication, email)
      .then((response) => {
        Alert.alert(
          "Sent!",
          "Password reset verification link sent to your email",
          [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
        );
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Email")
      });
    // await verifyPasswordResetCode(authentication,)
  };
  return (
    <View>
      <AppBackground />
      <View
        style={{
          justifyContent: "center",
          // alignItems: "center",
          height: height,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            width: width / 1.19,
            color: "#F0F5F9",
            fontSize: 16,
            fontWeight: "700",
            marginBottom: scale(22),
          }}
        >
          Enter your email we will send password reset link
        </Text>
        <TextField
          label="Phone Number or Email"
          onChangeText={(text) => setEmail(text)}
          error={error}
        />
        <TextButton
          type="long"
          text="Send"
          onPress={() => SendVerification()}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
