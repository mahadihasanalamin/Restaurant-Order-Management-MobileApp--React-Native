import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";

interface Props {
  title: string;
  address: string;
  image: {};
  onPress: () => void;
}

const AddressTile: FC<Props> = (props) => {
  return (
    <View>
      <View style={Styles.tile}>
        <TouchableOpacity onPress={props.onPress}>
          <Image
            source={require("../../../assets/icons/edit.png")}
            style={Styles.editIcon}
          />
        </TouchableOpacity>
        <View style={Styles.tileContent}>
          <Image source={props.image} style={Styles.icon} />
          <View style={{ flexDirection: "column" }}>
            <Text style={Styles.text}>{props.title}</Text>
            <Text style={Styles.text1}>{props.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressTile;

const Styles = ScaledSheet.create({
  text: {
    color: "#A9A9A9",
    fontSize: 12,
  },
  text1: {
    color: "#F0F5F9",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: "5@s",
  },
  icon: {
    height: "30@s",
    width: "30@s",
    resizeMode: "contain",
    marginRight: "14@s",
  },
  tile: {
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    marginTop: "40@s",
    height: "50@s",
    marginHorizontal: "16@s",
    borderRadius: "6@s",
    justifyContent: "center",
    // alignItems: "center",
  },
  tileContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "20@s",
  },
  editIcon: {
    height: "14@s",
    width: "14@s",
    resizeMode: "contain",
    position: "absolute",
    right: "14@s",
    top: "9@s",
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // textAlignVertical: 'center'
  },
});
