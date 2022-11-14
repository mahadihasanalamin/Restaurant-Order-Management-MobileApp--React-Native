import { stringLength } from "@firebase/util";
import React, { FC, useState } from "react";
import { Image, Text, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";

interface Props {
  focus: boolean;
  text: string;
  icon: object;
}
const BottonNavButton: FC<Props> = (props) => {
  return (
    <View>
      <View style={Styles.focusContainer}>
        <Image
          style={[
            Styles.image,
            { tintColor: props.focus ? "#E5251A" : "#747276" },
          ]}
          source={props.icon}
        />
      </View>
    </View>
  );
};

export default BottonNavButton;

const Styles = ScaledSheet.create({
  focusContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '48@s',
    // width: '130@s',
    // borderColor: '#E5251A',
    // borderRadius: 5,
    // borderWidth: 1,
  },

  image: {
    height: "25.28@s",
    width: "27.93@s",
    resizeMode: "contain",
  },

  text: {
    color: "#E5251A",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "14.07@s",
  },
});
