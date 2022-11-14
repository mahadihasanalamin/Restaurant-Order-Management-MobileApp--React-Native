import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  id?: string;
  subTotal: number;
  deliveryCharge: number;
  onPress?: () => void;
}
const Calculation: FC<Props> = props => {
  return (
    <View style={Styles.container}>
      <View style={Styles.tile}>
        <View>
          <Text style={Styles.subTotal}>Sub Total</Text>
          <Text style={Styles.deliveryCharge}>Delivery Charge</Text>
        </View>
        <View>
          <Text style={Styles.subTotal}>{props.subTotal}</Text>
          <Text style={Styles.deliveryCharge}>{props.deliveryCharge}</Text>
        </View>
      </View>
      <View style={Styles.lineStyle} />

      <View style={Styles.tile}>
        <Text style={Styles.total}>Total</Text>
        <Text style={Styles.total}>
          {props.subTotal + props.deliveryCharge}
        </Text>
      </View>
    </View>
  );
};

export default Calculation;

const Styles = ScaledSheet.create({
  container: {
    display: 'flex',
    marginTop: '10@s',
  },
  tile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineStyle: {
    borderWidth: '0.5@s',
    borderColor: '#F0F5F9',
    marginVertical: '7@s',
  },
  total: {
    color: '#E5251A',
    fontSize: '16@s',
  },
  deliveryCharge: {
    color: '#F0F5F9',
    fontSize: '14@s',
  },
  subTotal: {
    color: '#F0F5F9',
    fontSize: '16@s',
    marginBottom: '5@s',
  },
});
