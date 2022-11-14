import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseUserStore } from "../zustand/UserStore";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { TextButton, TextField } from "../components";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/Firebase";
import uuid from "react-native-uuid";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>;
const AddAddress: FC<Props> = ({ navigation }) => {
  const router = useRoute<RouteProp<RootStackParamList, "AddAddress">>();
  const params = router.params;
  const category = params.category;
  const userStore = UseUserStore();

  const [inputs, setInputs] = useState({
    title: category,
    address: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    address: "",
  });

  const handleInputs = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const Validate = () => {
    Keyboard.dismiss();
    let valid = true;
    /////////////title
    if (!inputs.title) {
      handleError("Please Enter Your Address Title", "title");
      valid = false;
    } else if (Number(inputs.title)) {
      handleError("Address title must be alphabetic characters", "title");
      valid = false;
    } else {
      handleError("", "title");
      valid = true;
    }
    /////////////address
    if (!inputs.title) {
      handleError("Please Enter Your Address", "address");
      valid = false;
    } else {
      handleError("", "address");
      valid = true;
    }
    if (valid) {
      Add(userStore.user.uid);
    }
  };

  const handleError = (errorMessage: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const Add = async (id: string) => {
    let address = [];
    userStore.user.addresses?.map((addr) => {
      address.push(addr);
    });
    address.push({
      addrId: uuid.v4().toString(),
      title: inputs.title,
      address: inputs.address,
      category: category,
    });

    const userDoc = doc(db, "Users", id);
    const updateFields = {
      addresses: address,
    };
    await updateDoc(userDoc, updateFields);

    navigation.navigate("Addresses");
  };

  //   useEffect(() => {
  //     console.log(Geolocation.getCurrentPosition,)
  //   }, []);
  return (
    <View>
      <AppBackground />
      {/* <View style={Styles.container}>
        <MapView
          style={Styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View> */}
      <TextField
        label="Title"
        value={inputs.title}
        onChangeText={(text) => handleInputs(text, "title")}
        error={errors.title}
      />

      <TextField
        label="Address"
        value={inputs.address}
        onChangeText={(text) => handleInputs(text, "address")}
        error={errors.address}
      />

      <TextButton text="Save" type="long" onPress={Validate} />
    </View>
  );
};

export default AddAddress;

const Styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});