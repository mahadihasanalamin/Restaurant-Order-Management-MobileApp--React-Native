import React, {FC, useState} from 'react';
import {
  View,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IncreaseDecrease, TileFoodInfo} from '../../components';
import Food from '../../interfaces/Food';
import {CartItem} from '../../zustand/CartStore';

interface Props {
  cartFood: CartItem;
  onPress?: () => void;
}

const CartTile: FC<Props> = props => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={Styles.tile}>
          <TileFoodInfo food={props.cartFood.food} />
          <View
            style={{
              left: -30,
              top: 70,
            }}>
            <IncreaseDecrease
              quantity={props.cartFood.itemCount}
              cartid={props.cartFood.cartid}
              removeOption
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartTile;

const Styles = ScaledSheet.create({
  container: {
    display: 'flex',
    marginTop: '10@s',
    marginHorizontal: '10@s',
    borderRadius: '10@s',
    backgroundColor: 'rgba(240, 245, 249, 0.15)',
    justifyContent: 'space-between',
  },

  tile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: '10@s',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 10,
    marginVertical: 10,
    flexBasis: 80,
  },
});
