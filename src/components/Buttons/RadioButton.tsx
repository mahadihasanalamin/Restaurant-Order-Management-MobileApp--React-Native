import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  selected?: boolean;
}
const RadioButton: FC<Props> = props => {
  return (
    <View style={Styles.outsideCircle}>
      {props.selected ? <View style={Styles.insideCircle}></View> : null}
    </View>
  );
};

export default RadioButton;

const Styles = ScaledSheet.create({
  outsideCircle: {
    width: '18@s',
    height: '18@s',
    borderRadius: 100,
    borderWidth: '2@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F0F5F9',
  },

  insideCircle: {
    width: '9@s',
    height: '9@s',
    borderRadius: 100,
    backgroundColor: '#E5251A',
  },
});
