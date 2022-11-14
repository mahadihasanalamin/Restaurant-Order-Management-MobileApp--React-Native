import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";

interface Props {
  text: string;
  image: {};
  onPress: () => void;
}

const ProfileTile: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={Styles.tile}>
      <View style={Styles.tileContent}>
        <Image source={props.image} style={Styles.icon} />
        <Text style={Styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileTile;

const Styles = ScaledSheet.create({
  text: {
    color: "#F0F5F9",
    fontSize: 14,
    fontWeight: "700",
  },
  icon: {
    height: "18@s",
    width: "20@s",
    resizeMode: "contain",
    marginRight: "20@s",
  },
  tile: {
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    marginBottom: "20@s",
    height: "52@s",
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
