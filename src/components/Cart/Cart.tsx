import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { UseCartStore } from "../../zustand/CartStore";

interface Props {
  onPress: () => void;
}
const Cart: FC<Props> = (props) => {
  const carstore = UseCartStore();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={Styles.container}>
        <ImageBackground
          style={Styles.image}
          source={require("../../../assets/icons/cart.png")}
        >
          <Text style={Styles.text}>{carstore.cartItems.length}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};
export default Cart;

const Styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    height: "48@s",
    width: "48@s",
    backgroundColor: "#E5251A",
    borderRadius: 5,
  },
  image: {
    height: "30.5@s",
    width: "30.51@s",
    resizeMode: "contain",
    alignItems: "center",
  },

  text: {
    color: "#11263C",
    fontSize: 12,
    fontWeight: "bold",
    top: "2@s",
    left: "2.5@s",
  },
});
