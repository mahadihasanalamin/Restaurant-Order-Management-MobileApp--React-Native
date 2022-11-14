import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import { SharedElement } from 'react-navigation-shared-element';
import Food from '../../interfaces/Food';

interface Props {
     food: Food
}
const TileFoodInfo: FC<Props> = props => {
  return (
    <View style={Styles.container}>
      <SharedElement id={props.food.id}>
        <Image
          source={{uri: props.food.image}}
          style={{width: 100, height: 100}}
        />
      </SharedElement>

      <View style={{display: 'flex', flex: 1, padding: scale(10)}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#F0F5F9'}}>
          {props.food.title}
        </Text>
        <Text numberOfLines={2} style={{fontSize: 14, color: '#F0F5F9'}}>
          {props.food.subtitle}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#E5251A'}}>
          {props.food.price}Kr
        </Text>
      </View>
    </View>
  );
};

export default TileFoodInfo;

const Styles = ScaledSheet.create({
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
  },
});
