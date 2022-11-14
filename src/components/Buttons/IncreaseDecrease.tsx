import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {UseCartStore} from '../../zustand/CartStore';
import {UsePriceQuantityStore} from '../../zustand/PriceQuantityStore'; //zustand

interface Props {
  cartid?: string;
  color?: string;
  lbcolor?: string;
  rbcolor?: string;
  quantity?: number;
  removeOption?: boolean;
}
const IncreaseDecrease: FC<Props> = props => {
  let [count, setCount] = useState<number>(1);
  const priceQuantityStore = UsePriceQuantityStore();
  const cartStore = UseCartStore();

  useEffect(() => {
    if (props.quantity) {
      setCount(props.quantity);
    }
  }, [cartStore.cartItems]);

  useEffect(() => {
    cartStore.UpdateTotalPrice();
  }, [cartStore.cartItems]);

  const increment = () => {
    count = count + 1;
    setCount(count);
    priceQuantityStore.changeQuantity(count);
    if (props.cartid) {
      cartStore.ChangeItemCount(props.cartid, 1);
    }
  };

  const decrement = () => {
    if (props.removeOption && count == 1 && props.cartid) {
      cartStore.RemoveItem(props.cartid);
      
      return;
    }
    if (count > 1) {
      count = count - 1;
      setCount(count);
      priceQuantityStore.changeQuantity(count);
      if (props.cartid) {
        cartStore.ChangeItemCount(props.cartid, -1);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={[Styles.button, {backgroundColor: props.lbcolor, left: 5}]}
        onPress={() => decrement()}>
        <Text style={[Styles.operator, {color: props.color}]}>-</Text>
      </TouchableOpacity>
      <Text style={Styles.text}>{count}</Text>
      <TouchableOpacity
        style={[Styles.button, {backgroundColor: props.rbcolor, right: 4}]}
        onPress={() => increment()}>
        <Text style={[Styles.operator, {color: props.color}]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IncreaseDecrease;

const Styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  button: {
    width: '27@s',
    height: '26@s',
    borderRadius: '6@s',
    resizeMode: 'contain',
    marginHorizontal: '8@s',
  },
  operator: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  text: {
    color: '#2A2630',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    flexBasis: '6%',
  },
});
