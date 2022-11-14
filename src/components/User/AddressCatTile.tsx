import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";

interface Props {
  image: {};
  onPress: () => void;
}

const AddressCatTile: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={Styles.tile}>
      <View style={Styles.tileContent}>
        <Image source={props.image} style={Styles.icon} />
        <Text style={Styles.text}>Add+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCatTile;

const Styles = ScaledSheet.create({
  text: {
    color: "#E5251A",
    fontSize: 16,
    fontWeight: "700",
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
    alignItems: "center",
  },
  tileContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: "20@s",
  },
});
