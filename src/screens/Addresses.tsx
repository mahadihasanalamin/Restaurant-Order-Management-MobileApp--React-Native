import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { AddressTile, TextButton } from "../components";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseUserStore } from "../zustand/UserStore";

type Props = NativeStackScreenProps<RootStackParamList>;
const Addresses: FC<Props> = ({ navigation }) => {
  const userStore = UseUserStore();

  const AddressList = () => {
    if (userStore.user.addresses) {
      return userStore.user.addresses.map((address) => {
        return (
          <View key={address.address}>
            <AddressTile
              address={address.address}
              title={address.title}
              image={
                address.category == "Home"
                  ? require("../../assets/icons/home1.png")
                  : address.category == "Work"
                  ? require("../../assets/icons/work.png")
                  : require("../../assets/icons/location.png")
              }
              onPress={() => navigation.navigate("EditAddress", { address })}
            />
          </View>
        );
      });
    }
  };
  return (
    <View>
      <AppBackground />
      <ScrollView>
        {AddressList()}

        <View style={{ marginTop: scale(70), marginBottom: scale(40) }}>
          <TextButton
            text="Add New"
            type="long"
            onPress={() => navigation.navigate("AddressCategories")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Addresses;

const Styles = ScaledSheet.create({});
