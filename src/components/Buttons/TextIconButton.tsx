import React, { FC, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import { scale, ScaledSheet } from "react-native-size-matters";
import { RadioButton } from "../../components";

interface Props {
  text: string;
  leftIcon: {};
  onPress: () => void;
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={300} />
  </Transition.Together>
);

const TextIconButton: FC<Props> = (props) => {
  const ref = React.useRef<any>();

  return (
    <Transitioning.View
      transition={transition}
      ref={ref}
      style={[
        { marginTop: scale(20), height: scale(50)  },
        Styles.rectangle,
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          ref.current.animateNextTransition();
          props.onPress();
        }}
        activeOpacity={0.5}
      >
        <View style={[Styles.container]}>
          <Image
            source={props.leftIcon}
            style={Styles.leftImage}
            resizeMode="contain"
          />
          <Text style={Styles.text}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </Transitioning.View>
  );
};

export default TextIconButton;

const Styles = ScaledSheet.create({
  rectangle: {
    // height: '50@s',
    width: "323@s",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    // flexGrow: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "10@s",
  },
  leftImage: {
    height: "24@s",
    width: "30@s",
  },
  text: {
    color: "#F0F5F9",
    fontSize: 14,
    marginLeft: "15@s",
    alignSelf: "center",
  },
  expandTitle: {
    marginHorizontal: scale(15),
    marginTop: scale(6),
    marginBottom: scale(6),
    fontSize: 14,
    color: "#F0F5F9",
  },

  expandItem: {
    marginHorizontal: scale(15),
    color: "#F0F5F9",
  },
});
