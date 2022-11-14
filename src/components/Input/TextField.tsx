import React, { FC } from "react";
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { scale } from "react-native-size-matters";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get("screen");

interface Props {
  placeholder?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label: string;
  rightText?: string;
  rightTextPress?: () => void;
  value?: string;
  iconName?: string;
  error: string;
  notEditable?: boolean;
}

const TextField: FC<Props> = (props) => {
  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.text}>{props.label}</Text>
        <TextInput
          style={[
            Styles.input,
            { borderBottomColor: props.error ? "#E5251A" : "#A9A9A9" },
          ]}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry || false}
          value={props.value}
          editable={props.notEditable ? false : true}
          keyboardType={
            props.label == "Phone Number" ? "numeric" : "name-phone-pad"
          }
        />
        <TouchableOpacity onPress={props.rightTextPress}>
          <Text style={[Styles.rightText, { color: "#00C12D", fontWeight: '700' }]}>
            {props.rightText}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={Styles.error}>{props.error}</Text>
    </View>
  );
};

export default TextField;

const Styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    alignSelf: "center",
    marginBottom: scale(35),
  },

  text: {
    color: "#A9A9A9",
    fontSize: 12,
    // fontWeight: '300',
  },
  input: {
    color: "#F0F5F9",
    fontSize: 14,
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 11,
    color: "#FF0000",
  },
  rightText: {
    fontSize: 14,
    // textDecorationColor: "#E5251A",
    // textDecorationStyle: "solid",
    // textDecorationLine: "underline",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
