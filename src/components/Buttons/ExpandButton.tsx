import React, { FC, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { TextIconButton } from "../../components";
import { UseUserStore } from "../../zustand/UserStore";
import { RadioButton } from "../../components";
import { Transition, Transitioning } from "react-native-reanimated";

interface Props {
  text: string;
  expandItems: ExpandItem[];
  icon: {};
}

export interface ExpandItem {
  id: string;
  title: string;
  subtitle: string;
}
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={300} />
  </Transition.Together>
);
const ExpandButton: FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const userStore = UseUserStore();
  const [expand, setExpand] = useState<boolean>(false);
  const ref = React.useRef<any>();

  const ExpandItemList = () => {
    return props.expandItems.map((item: ExpandItem) => {
      return (
        <TouchableOpacity
          style={{ marginBottom: scale(11), flexDirection: "row" }}
          onPress={() => {
            setSelectedItem(item.id);
          }}
        >
          <View style={{ flexBasis: "90%" }}>
            <Text style={[Styles.expandItem, { fontSize: 10 }]}>
              {item.title}
            </Text>
            <Text style={[Styles.expandItem, { fontSize: 14 }]}>
              {item.subtitle}
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            {selectedItem == item.id ? (
              <RadioButton selected />
            ) : (
              <RadioButton />
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
      <Transitioning.View
        transition={transition}
        ref={ref}
        style={[
          { marginTop: scale(20) },
          Styles.rectangle,
          !expand ? { height: scale(50) } : null,
        ]}
      >
        {/* <TextIconButton
            text={props.text}
            leftIcon={props.icon}
            rightIcon={
              expand
                ? require("../../../assets/icons/uparrow.png")
                : require("../../../assets/icons/downarrow.png")
            }
            onPress={() => setExpand(!expand)}
            expand={expand}
            expandItems={props.expandItems}
          /> */}

        <TouchableOpacity
          onPress={() => {
            ref.current.animateNextTransition();
            setExpand(!expand);
          }}
          activeOpacity={0.5}
        >
          <View
            style={[Styles.container, expand ? { marginTop: scale(13) } : null]}
          >
            <Image
              source={props.icon}
              style={Styles.leftImage}
              resizeMode="contain"
            />
            <Text style={Styles.text}>{props.text}</Text>
            <Image
              source={
                expand
                  ? require("../../../assets/icons/uparrow.png")
                  : require("../../../assets/icons/downarrow.png")
              }
              style={Styles.rightImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {expand ? (
          <View>
            <Text style={Styles.expandTitle}>Addresses</Text>
            {ExpandItemList()}
          </View>
        ) : null}
      </Transitioning.View>
    </View>
  );
};

export default ExpandButton;

const Styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "10@s",
  },
  leftImage: {
    height: "24@s",
    width: "30@s",
  },
  rightImage: {
    height: "15@s",
    width: "10@s",
    alignSelf: "center",
    right: 10,
    position: "absolute",
  },
  text: {
    color: "#F0F5F9",
    fontSize: 14,
    marginLeft: "15@s",
    alignSelf: "center",
  },
  rectangle: {
    width: "323@s",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "10@s",
    borderRadius: 5,
    backgroundColor: "rgba(240, 245, 249, 0.15)",
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
