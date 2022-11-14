import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { ProfileTile } from "../components";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseUserStore } from "../zustand/UserStore";

type Props = NativeStackScreenProps<RootStackParamList>;
const Profile: FC<Props> = ({ navigation }) => {
  const userStore = UseUserStore();

  const EditProfile = () => {
    navigation.navigate("EditProfile");
  };
  const SignOut = () => {
    userStore.EmptyUserStore();
  };
  useEffect(() => {}, []);
  return (
    <View>
      <AppBackground />
      <View style={Styles.tile}>
        <TouchableOpacity onPress={() => EditProfile()}>
          <Image
            source={require("../../assets/icons/edit.png")}
            style={Styles.editIcon}
          />
        </TouchableOpacity>
        <View style={Styles.tileContent}>
          <Image
            source={
              userStore.user.image
                ? { uri: userStore.user.image }
                : require("../../assets/icons/profile.png")
            }
            style={Styles.image}
          />
          <View style={{ alignSelf: "center" }}>
            <Text style={[Styles.text, { fontSize: 16 }]}>
              {userStore.user.name}
            </Text>
            <Text style={Styles.text}>{userStore.user.email}</Text>
            <Text style={Styles.text}>{userStore.user.phone}</Text>
          </View>
        </View>
      </View>

      <ProfileTile
        text="Payment Method"
        image={require("../../assets/icons/card.png")}
        onPress={() => "#"}
      />
      <ProfileTile
        text="My Address"
        image={require("../../assets/icons/location.png")}
        onPress={() =>
          navigation.navigate(
            userStore.user.addresses?.length!=0 ? "Addresses" : "AddressCategories"
          )
        }
      />
      <ProfileTile
        text="Help Center"
        image={require("../../assets/icons/help.png")}
        onPress={() => "#"}
      />
      <ProfileTile
        text="Sign out"
        image={require("../../assets/icons/signout.png")}
        onPress={() => SignOut()}
      />
    </View>
  );
};

export default Profile;

const Styles = ScaledSheet.create({
  text: {
    color: "#F0F5F9",
    fontWeight: "700",
    marginBottom: "4@s",
  },
  image: {
    height: "80@s",
    width: "80@s",
    resizeMode: "contain",
    marginRight: "20@s",
    borderRadius: 50,
    borderColor: "#F0F5F9",
    borderWidth: 1,
  },
  editIcon: {
    height: "14@s",
    width: "14@s",
    resizeMode: "contain",
    position: "absolute",
    right: "14@s",
  },
  tile: {
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    marginTop: "20@s",
    marginBottom: "20@s",
    height: "113@s",
    marginHorizontal: "16@s",
    borderRadius: "6@s",
    justifyContent: "center",
  },
  tileContent: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "20@s",
  },
});
