import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, Image, ScrollView } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { Calculation } from "../components";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseCartStore } from "../zustand/CartStore";
import "react-native-reanimated";
import AppBackground from "../AppBackground";
import { UseOrderPriceStore } from "../zustand/OrderPriceStore";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Order, UseOrderStore } from "../zustand/OrderList";
const Height = Dimensions.get("window").height;

type Props = NativeStackScreenProps<RootStackParamList>;

const TrackOrder: FC<Props> = () => {
  const orderPriceStore = UseOrderPriceStore();
  const orderStore = UseOrderStore();
  const [totalPrice, setTotalPrice] = useState<number>(
    orderPriceStore.subTotal
  );
  const [order, setOrder] = useState<Order>();
  const router = useRoute<RouteProp<RootStackParamList, "TrackOrder">>();
  const orderId = router.params.orderId;

  useEffect(() => {
    orderStore.orders.map((order) => {
      if (orderId == order.oid) {
        setOrder(order);
      }
    });
  }, [orderStore]);
  const [timer, setTimer] = useState(2);
  const [sec, setSec] = useState<number>(0);
  const [minute, setMinute] = useState<number>(20);

  useEffect(() => {
    if (order?.order_status == "ready") {
      setMinute(0);
      setSec(0);
      clearTimeout();
      return;
    }
    if (minute > 0) {
      setTimeout(() => {
        if (sec === 0) {
          setSec(59);
          setMinute(minute - 1);
        } else {
          setSec(sec - 1);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        if (sec > 0) {
          setSec(sec - 1);
        }
      }, 1000);
    }
  }, [sec]);

  useEffect(() => {
    setTotalPrice(orderPriceStore.subTotal);
  }, [orderPriceStore.subTotal]);

  useEffect(() => {
    setTotalPrice(orderPriceStore.subTotal);
  }, [orderPriceStore]);

  const trackorder = () => {
    return (
      <View>
        {order?.order_status == "accepted" ? (
          <Text style={Styles.text}>Your food is preparing</Text>
        ) : order?.order_status == "ready" ? (
          <Text style={Styles.text}>Your food is ready to pick up</Text>
        ) : order?.order_status == "pickedup" ? (
          <Text style={Styles.text}>Your food is successfully picked up </Text>
        ) : null}

        <Text style={Styles.text}>{minute + ":" + sec}</Text>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View style={[Styles.rectangle, { backgroundColor: "#E5251A" }]} />
          <View
            style={[
              Styles.rectangle,
              order?.order_status == "ready" || "ready" || "pickedup"
                ? { backgroundColor: "#E5251A" }
                : null,
            ]}
          />
          <View
            style={[
              Styles.rectangle,
              order?.order_status == "pickedup"
                ? { backgroundColor: "#E5251A" }
                : null,
            ]}
          />
          {/* backgroundColor: "#E5251A" */}
        </View>
        {/* //////////////////////////////////////////////////////////*/}

        <View style={Styles.Calculation}>
          <Calculation
            subTotal={totalPrice}
            deliveryCharge={totalPrice == 0 ? 0 : 100}
          ></Calculation>
        </View>
      </View>
    );
  };
  // useEffect(() => {
  //   trackorder();
  // }, [orderStore]);
  return (
    <View>
      <AppBackground />
      <ScrollView>
        {order?.order_status == "pending" ? (
          <Text style={Styles.text}>Wait for resoponse...</Text>
        ) : (
          trackorder()
        )}
      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const Styles = ScaledSheet.create({
  Calculation: {
    marginTop: "20@s",
    width: "315@s",
    marginLeft: "16@s",
  },

  next: {
    alignSelf: "center",
    marginTop: "120@s",
  },
  text: {
    alignSelf: "center",
    color: "#F0F5F9",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: "22@s",
  },
  rectangle: {
    height: "11@s",
    width: "73@s",
    borderRadius: 10,
    marginRight: "21@s",
    borderWidth: 2,
    borderColor: "#E5251A",
  },

  rectangle1: {
    height: "11@s",
    width: "35@s",
    borderRadius: 10,
    marginRight: "21@s",
    borderWidth: 2,
    borderColor: "#E5251A",
    backgroundColor: "#E5251A",
  },
});
