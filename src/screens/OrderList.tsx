import React, { FC } from "react";
import Moment from "moment";
import { Image, ScrollView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { Order, UseOrderStore } from "../zustand/OrderList";
import { OrderTile } from "../components";

const OrderList: FC = () => {
  const orderStore = UseOrderStore();
  const Orders = () => {
    if (orderStore.orders.length == 0) {
      return (
        <View style={Styles.emptyContainer}>
          <Image
            source={require("../../assets/icons/emptyOrderList.png")}
            style={Styles.image}
            resizeMode="contain"
          />
          <Text style={Styles.text}>Your order list is empty!</Text>
        </View>
      );
    }
    return orderStore.orders.map((order: Order) => {
      return (
        
          <View key={order.oid}>
            <OrderTile Order={order} />
          </View>
      );
    });
  };
  return (
    <View>
      <AppBackground />
      <ScrollView>{Orders()}</ScrollView>
    </View>
  );
};

export default OrderList;

const Styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#F0F5F9",
    fontWeight: "900",
    fontSize: 16,
    marginTop: "23.5@s",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: "180@s",
    // alignSelf:'center',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  image: {
    height: "249.2@s",
    width: "217.18@s",
  },
});
