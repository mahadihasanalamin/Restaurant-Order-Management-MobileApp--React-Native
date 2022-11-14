import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import Moment from "moment";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import {
  CartTile,
  ExpandButton,
  Schedule,
  TextButton,
  TextIconButton,
} from "../components";
import { Calculation } from "../components";
import { ExpandItem } from "../components/Buttons/ExpandButton";
import { db } from "../database/Firebase";
import { RootStackParamList } from "../navigation/NavigationTypes";
import { UseCartStore } from "../zustand/CartStore";
import { UseOrderPriceStore } from "../zustand/OrderPriceStore";
import { ScheduleStore } from "../zustand/Schedule";
import { UseUserStore } from "../zustand/UserStore";
import uuid from "react-native-uuid";

const Height = Dimensions.get("window").height;
type Props = NativeStackScreenProps<RootStackParamList>;
const MakePayment: FC<Props> = ({ navigation }) => {
  const cartStore = UseCartStore();
  const userStore = UseUserStore();
  const orderPriceStore = UseOrderPriceStore();
  const [totalPrice, setTotalPrice] = useState<number>(cartStore.totalPrice);
  const [addr, setAddr] = useState<ExpandItem[]>([]);
  const scheduleStore = ScheduleStore();

  useEffect(() => {
    userStore.user.addresses?.map((address) => {
      setAddr((addr) => [
        ...addr,
        {
          id: address.addrId,
          title: address.title,
          subtitle: address.address,
        },
      ]);
    });
  }, []);
  useEffect(() => {
    cartStore.UpdateTotalPrice();
    setTotalPrice(cartStore.totalPrice);
  }, [cartStore.cartItems]);

  useEffect(() => {
    setTotalPrice(cartStore.totalPrice);
  }, [cartStore]);

  const ConfirmPayment = async () => {
    const coRef = collection(db, "Orders");
    let orderId = uuid.v1().slice(1, 8).toString();
    if (scheduleStore.timeStamp) {
      // await addDoc(coRef, {
        await setDoc(doc(db,"Orders",orderId),{
        c_id: userStore.user.uid,
        ordered_items: cartStore.cartItems,
        totalPrice: cartStore.totalPrice,
        order_status: "pending",
        timestamp: new Date(),
        schedule: scheduleStore.timeStamp,
      });
      scheduleStore.CancelSchedule();
    } else {
      await setDoc(doc(db, "Orders", orderId), {
        c_id: userStore.user.uid,
        ordered_items: cartStore.cartItems,
        totalPrice: cartStore.totalPrice,
        order_status: "pending",
        timestamp: new Date(),
      });
      scheduleStore.CancelSchedule();
    }
    orderPriceStore.changeOrderPrice(cartStore.totalPrice, 100);
    cartStore.EmptyCartStore();
    navigation.navigate("TrackOrder",{orderId});
  };

  return (
    <View>
      <AppBackground />
      <ScrollView>
        <View style={Styles.Calculation}>
          <Calculation
            subTotal={totalPrice}
            deliveryCharge={totalPrice == 0 ? 0 : 100}
          ></Calculation>
        </View>
        {scheduleStore.timeStamp ? (
          <Text style={Styles.Schedule}>
            {Moment(scheduleStore.timeStamp).format(
              "dddd, Do MMMM YYYY, hh:mm A"
            )}
          </Text>
        ) : null}
        <ExpandButton
          text="Choose Address"
          icon={require("../../assets/icons/location.png")}
          expandItems={addr}
        />

        <View style={{ marginTop: scale(120), marginBottom: scale(50) }}>
          <TextButton
            text="Confirm Payment"
            type="long"
            onPress={() => ConfirmPayment()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MakePayment;

const Styles = ScaledSheet.create({
  Calculation: {
    marginTop: "20@s",
    width: "315@s",
    marginLeft: "16@s",
    marginBottom: "70@s",
  },
  Schedule: {
    fontSize: 14,
    color: "#E5251A",
    marginTop: scale(-55),
    marginBottom: scale(50),
    marginLeft: scale(16),
  },
});
