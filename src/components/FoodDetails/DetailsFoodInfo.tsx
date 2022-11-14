import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Food from '../../interfaces/Food';
import {UsePriceQuantityStore} from '../../zustand/PriceQuantityStore';
import {IncreaseDecrease} from '../../components';

interface Props {
  food: Food;
}

const DetailsFoodInfo: FC<Props> = props => {
  const [lbcolor, setLBcolor] = useState('#E5251A');

  const priceQuantityStore = UsePriceQuantityStore();
  useEffect(() => {
    if (priceQuantityStore.quantity == 1) {
      setLBcolor('#E5251A4D');
    }
    else{
      setLBcolor('#E5251A');
    }
  }, [priceQuantityStore]);
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={Styles.title}>{props.food.title}</Text>
      </View>
      <Text style={Styles.subtitle}>{props.food.subtitle}</Text>

      <View style={Styles.princrdec}>
        <Text style={Styles.price}>{props.food.price}Kr</Text>
        <IncreaseDecrease rbcolor="#E5251A" lbcolor={lbcolor} color="#F0F5F9" />
      </View>
    </View>
  );
};

export default DetailsFoodInfo;

const Styles = ScaledSheet.create({
  princrdec: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '10@s',
    color: '#2A2630',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginBottom: '10@s',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
});
