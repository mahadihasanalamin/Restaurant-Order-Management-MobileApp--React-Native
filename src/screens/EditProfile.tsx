import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { FC, useEffect, useState } from "react";
import {
  Image,
  ImagePickerIOS,
  Keyboard,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { TextButton, TextField } from "../components";
import { db, storage } from "../database/Firebase";
import { UseUserStore } from "../zustand/UserStore";
import * as ImagePicker from "expo-image-picker";

const EditProfile: FC = () => {
  const userStore = UseUserStore();

  const [inputs, setInputs] = useState({
    name: userStore.user.name,
    phone: userStore.user.phone,
    image: userStore.user.image,
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
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

    if (valid) {
      Update(userStore.user.uid);
    }
  };

  const handleError = (errorMessage: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    async () => {
      if (Platform.OS != "web") {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (status != "granted") {
          alert("sorry,we need camera roll permission to make this work");
        }
      }
    };
  }, []);

  const UploadPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const reference = ref(
        storage,
        "user_profile/" + userStore.user.uid + ".jpg"
      );
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);

      await getDownloadURL(reference).then(async (url) => {
        const userDoc = doc(db, "Users", userStore.user.uid);
        const updateFields = {
          image: url,
        };
        await updateDoc(userDoc, updateFields);
      });
    }
  };

  const Update = async (id: string) => {
    const userDoc = doc(db, "Users", id);
    const updateFields = {
      name: inputs.name,
      phone: inputs.phone,
    };
    await updateDoc(userDoc, updateFields);
  };
  return (
    <View>
      <AppBackground />
      <ScrollView>
        <Image
          source={
            inputs.image
              ? { uri: userStore.user.image }
              : require("../../assets/icons/profile.png")
          }
          style={Styles.image}
        />
        <View style={{ alignSelf: "center", marginBottom: scale(30) }}>
          <TextButton
            text="Change Picture"
            height={50}
            width={150}
            onPress={() => UploadPicture()}
          />
        </View>

        <TextField
          label="Name"
          value={inputs.name}
          onChangeText={(text) => handleInputs(text, "name")}
          error={errors.name}
        />
        <TextField
          label="Email"
          value={userStore.user.email}
          rightText="Verified"
          notEditable
          error=""
          onChangeText={() => "#"}
        />
        <TextField
          label="Phone Number"
          value={inputs.phone}
          onChangeText={(text) => handleInputs(text, "phone")}
          error={errors.phone}
        />

        <TextButton
          type="long"
          text="Save Changes"
          onPress={() => Validate()}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const Styles = ScaledSheet.create({
  image: {
    height: "180@s",
    width: "180@s",
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "#F0F5F9",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: "20@s",
    marginBottom: "40@s",
  },
});
