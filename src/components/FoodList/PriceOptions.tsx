import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {TextButton} from '../../components';
import {Sort, UseSortStore} from '../../zustand/SortStore';

const PriceOptions: FC = () => {
  const [priceOrder, setPriceOrder] = useState(['Low to High', 'High to Low']);
  const sortStore = UseSortStore();

  const [selectedPO, setSelectedPO] = useState<string>(sortStore.priceOrder);

  useEffect(() => {
    sortStore.setPriceOrder(selectedPO);
  }, [selectedPO]);

  const PriceOptions = () => {
    return priceOrder.map(item => {
      return (
        <View style={{marginLeft: 20, marginBottom: 21}}>
          <TextButton
            text={item}
            height={35}
            width={120}
            color={selectedPO != item ? '#2A2630' : '#F0F5F9'}
            bcolor={selectedPO != item ? '#E5251A4D' : '#E5251A'}
            onPress={() => setSelectedPO(item)}
          />
        </View>
      );
    });
  };
  return (
    <View style={[Styles.flexRow, {marginLeft: -20}]}>{PriceOptions()}</View>
  );
};

export default PriceOptions;

const Styles = ScaledSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
