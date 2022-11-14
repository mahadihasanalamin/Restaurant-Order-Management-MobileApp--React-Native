import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { AddressCatTile, ProfileTile } from "../components";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseUserStore } from "../zustand/UserStore";

type Props = NativeStackScreenProps<RootStackParamList>;
const AddressCategories: FC<Props> = ({ navigation }) => {
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
      <AddressCatTile
        image={require("../../assets/icons/home1.png")}
        onPress={() => navigation.navigate("AddAddress", { category: "Home" })}
      />
      <AddressCatTile
        image={require("../../assets/icons/work.png")}
        onPress={() => navigation.navigate("AddAddress", { category: "Work" })}
      />
      <AddressCatTile
        image={require("../../assets/icons/location.png")}
        onPress={() => navigation.navigate("AddAddress", { category: "Other" })}
      />
    </View>
  );
};

export default AddressCategories;

const Styles = ScaledSheet.create({});
