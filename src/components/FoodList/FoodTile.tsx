import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AddFav, TileFoodInfo } from "../../components";
import AddOn from "../../interfaces/AddOn";
import Food from "../../interfaces/Food";
import { RootStackParamList } from "../../navigation/NavigationTypes";
import { CartItem, UseCartStore } from "../../zustand/CartStore";
import uuid from "react-native-uuid";

interface Props {
  food: Food;
  onPressDetails?: () => void;
  onPressAdd?: () => void;
}

const FoodTile: FC<Props> = (props) => {
  const [addText, setAddText] = useState<string>("Add");
  const [itemCount, setitemCount] = useState(1);
  const [addOn, setAddOn] = useState<Array<AddOn>>([]);
  const [food, setFood] = useState<Food>(props.food);

  const cartStore = UseCartStore();
  const isFocused = useIsFocused();

  const Add = () => {
    if (addText == "Add") {
      setAddText("Added");
      let cartid: string = uuid.v4().toString();
      const newCartItem: CartItem = {
        food,
        itemCount,
        addOn,
        cartid,
      };
      cartStore.AddCartItem(newCartItem);

      return;
    }
    if (props.onPressAdd) return props.onPressAdd();
  };

  useEffect(() => {
    setAddText("Add");
    cartStore.cartItems.map((cartItem: CartItem) => {
      if (cartItem.food.id == props.food.id) {
        setAddText("Added");
      }
    });
    console.log(cartStore.cartItems.length);
  }, [cartStore.cartItems]);

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={props.onPressDetails}>
        <View style={Styles.tile}>
          <TileFoodInfo food={props.food} />
          <View style={Styles.right}>
            <AddFav food={props.food} />
            <TouchableOpacity onPress={() => Add()}>
              <Text style={Styles.add}>{addText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FoodTile;

const Styles = ScaledSheet.create({
  container: {
    display: "flex",
    marginTop: "10@s",
    marginHorizontal: "10@s",
    borderRadius: "10@s",
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    justifyContent: "space-between",
  },

  tile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "10@s",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    marginRight: 10,
    marginVertical: 10,
    flexBasis: 80,
  },
  add: {
    color: "#E5251A",
    fontSize: 20,
    fontWeight: "700",
  },
});
