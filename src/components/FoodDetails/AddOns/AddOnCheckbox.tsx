import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {scale, ScaledSheet} from 'react-native-size-matters';
import AddOn from '../../../interfaces/AddOn';
import {UseAddOnStore} from '../../../zustand/AddOnStore';

interface Props {
  addonlist: AddOn[];
  // onClick: ()=> {};
}
const AddOnCheckbox: FC<Props> = props => {
  const Addonlist = () => {
    return props.addonlist.map(addon => {
      const [check, setCheck] = useState(false);
      const useAddOnStore = UseAddOnStore();

      useEffect(() => {
        if (check) {
          useAddOnStore.AddItem(addon);
        } else {
          useAddOnStore.RemoveItem(addon);
        }
      }, [check]);

      return (
        <View style={Styles.check}>
          <Text style={[Styles.Text, {flexBasis: '45%'}]}>{addon.name}</Text>
          <Text style={[Styles.Text, {flexBasis: '40%'}]}>{addon.price}kr</Text>
          <CheckBox
            onClick={() => {
              setCheck(!check);
            }}
            isChecked={check}
            leftTextStyle={{color: 'black'}}
          />
        </View>
      );
    });
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <Text style={Styles.AddOn}>Add On's</Text>
        <View
          style={{
            height: 1,
            width: scale(250),
            backgroundColor: 'black',
            top: scale(8),
          }}
        />
      </View>
      <View>{Addonlist()}</View>
    </View>
  );
};

export default AddOnCheckbox;

const Styles = ScaledSheet.create({
  check: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '23@s',
  },
  Text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2630',
  },

  AddOn: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2630',
    marginBottom: '24@s',
    borderBottomColor: 'black',
    marginRight: '21@s',
  },
});
