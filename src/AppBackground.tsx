import React from 'react';
import {Dimensions, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const AppBackground = () => {
  return (
    <Image
      style={{height: scale(Height), width: scale(Width), position: 'absolute'}}
      resizeMode="cover"
      blurRadius={10}
      source={require('../assets/images/elvan.png')}
    />
  );
};
export default AppBackground;
