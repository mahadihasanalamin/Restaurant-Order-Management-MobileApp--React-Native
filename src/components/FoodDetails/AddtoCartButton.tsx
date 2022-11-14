import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {UseAddOnStore} from '../../zustand/AddOnStore';

const {height, width} = Dimensions.get('screen');

interface Props {
  title: string;
  left?: string;
  right?: string;
  onPress: () => void;
}

const AddtoCartButton: FC<Props> = props => {
  const addOnStore = UseAddOnStore();
  
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={props.onPress}>
      <Text style={[Styles.text, {flexBasis: '20%', marginStart: 20}]}>
        {props.left}
      </Text>
      <Text style={[Styles.text, {flexBasis: '30%'}]}>{props.title}</Text>
      <Text style={[Styles.text, {flexBasis: '10%'}]}>{props.right}</Text>
    </TouchableOpacity>
  );
};

export default AddtoCartButton;

const Styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: '10@s',
    width: '333@s',
    height: '50@s',
    borderRadius: '10@s',
    justifyContent: 'space-between',
    marginTop: '40@s',
    marginBottom: '45@s',
    backgroundColor: '#E5251A',
  },
  text: {
    color: '#F0F5F9',
    fontWeight: 'bold',
    fontSize: '16@s',
  },
});
