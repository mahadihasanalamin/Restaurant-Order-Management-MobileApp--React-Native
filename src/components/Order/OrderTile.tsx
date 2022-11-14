import React, { FC, useState } from "react";
import Moment from "moment";
import { Text, TouchableOpacity, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { Order } from "../../zustand/OrderList";

interface Props {
  Order: Order;
}

const OrderTile: FC<Props> = (props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const food = () => {
    return props.Order.ordered_items.map((item) => {
      let addOnPrice = 0;
      item.addOn.map((addon) => {
        addOnPrice += addon.price ? addon.price : 0;
      });
      return (
        <View style={[Styles.rowView, { marginTop: scale(2) }]} key={item.cartid}>
          <Text style={Styles.foodName}>
            {item.food.title} X {item.itemCount}
          </Text>
          <Text style={Styles.foodPrice}>
            {item.itemCount * item.food.price + (item.addOn ? addOnPrice : 0)}
          </Text>
        </View>
      );
    });
  };
  return (
    <View style={Styles.container}>
      <View style={[Styles.rowView, { marginTop: scale(10) }]}>
        <Text style={Styles.time}>
          {Moment(props.Order.timestamp).format("D MMM YYYY, hh:mm A")}
        </Text>
        <Text style={{ color: "#FF0000", fontSize: 14 }}>
          {props.Order.order_status}
        </Text>
      </View>

      <Text style={Styles.ordercode}>Order Code: {props.Order.oid}</Text>

      {!clicked ? (
        <TouchableOpacity onPress={() => setClicked(true)}>
          <View style={[Styles.rowView, { marginTop: scale(2) }]}>
            <Text style={Styles.seemore}>See more</Text>
            <Text style={{ color: "#E5251A", fontSize: 14 }}>
              {props.Order.totalPrice}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          {food()}
          <TouchableOpacity onPress={() => setClicked(false)}>
            <View style={[Styles.rowView, { marginTop: scale(2) }]}>
              <Text style={Styles.seemore}>See less</Text>
              <Text style={{ color: "#E5251A", fontSize: 14 }}>
                {props.Order.totalPrice}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderTile;

const Styles = ScaledSheet.create({
  container: {
    backgroundColor: "rgba(240, 245, 249, 0.15)",
    marginTop: "20@s",
    justifyContent: "center",
    marginHorizontal: "16@s",
    borderRadius: "10@s",
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    marginLeft: scale(10),
    marginTop: scale(2),
  },
  seemore: {
    color: "#E5251A",
    fontSize: 14,
    flexBasis: "80%",
    textDecorationColor: "#E5251A",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginBottom: scale(10)
  },
  ordercode: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: scale(10),
    marginTop: scale(2),
  },
  foodName: {
    color: "#F0F5F9",
    fontSize: 14,
    flexBasis: "80%",
  },
  foodPrice: {
    color: "#F0F5F9",
    fontSize: 14,
    textAlign: "right",
  },
  time: {
    color: "#F0F5F9",
    fontSize: 16,
    fontWeight: "700",
    flexBasis: "80%",
  },
});
