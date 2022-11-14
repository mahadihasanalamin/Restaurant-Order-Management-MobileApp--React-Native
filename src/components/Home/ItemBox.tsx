import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

interface Props {
  image: string;
  name: string;
  onPress: ()=> void;
}
const ItemBox: FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={Styles.container}>
        <View style={Styles.rectangle}></View>
        <Image source={{uri: props.image}} style={Styles.image} />
        <Text style={Styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBox;

const Styles = ScaledSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  rectangle: {
    height: '122@s',
    width: '158@s',
    backgroundColor: '#F0F5F9',
    opacity: 0.15,
    marginLeft: '13@s',
    borderRadius: 5,
  },
  image: {
    width: '155@s',
    height: '154@s',
    marginLeft: '13@s',
    top: '-205@s',
  },
  text: {
    fontSize: 18,
    color: '#F0F5F9',
    fontWeight: 'bold',
    top: '-190@s',
    alignSelf: 'center',
  },
});
