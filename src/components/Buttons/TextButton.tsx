import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

interface Props {
  text: string;
  height?: number;
  width?: number;
  color?: string;
  bcolor?: string;
  type?: 'long' | 'short';
  onPress?: () => void;
}
const TextButton: FC<Props> = props => {
  return (
    <View style={props.type == 'long' ? {alignSelf: 'center'} : null}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {
            backgroundColor: props.bcolor ? props.bcolor : '#E5251A',
            height:
              props.type == 'long'
                ? scale(50)
                : scale(props.height ? props.height : 35),
            width:
              props.type == 'long'
                ? scale(313)
                : scale(props.width ? props.width : 120),
          },
          Styles.container,
        ]}>
        <Text
          style={[Styles.text, {color: props.color ? props.color : '#F0F5F9'}]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextButton;

const Styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontWeight: '700',
    fontSize: '16@s',
  },
});
