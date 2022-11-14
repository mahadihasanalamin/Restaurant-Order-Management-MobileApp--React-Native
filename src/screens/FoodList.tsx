import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Cart, FoodTile, Search, Sort} from '../components';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {ScrollView} from 'react-native-gesture-handler';

import Food from '../interfaces/Food';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UseFoodStore} from '../zustand/FoodMenuList';
import {UseCartStore} from '../zustand/CartStore';
import {UseModalStore} from '../zustand/ModalVisible';
import {UseSortStore} from '../zustand/SortStore';
import AppBackground from '../AppBackground';

const Height = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList>;
const FoodList: FC<Props> = ({navigation}) => {
  const router = useRoute<RouteProp<RootStackParamList, 'FoodList'>>();
  const params = router.params;
  const category = params.category;
  const foodStore = UseFoodStore();
  const cartStore = UseCartStore();
  const [foodlist, setFoodList] = useState(foodStore.FoodItems);
  const modalStore = UseModalStore();
  const sortStore = UseSortStore();
  const [fixedPR, setFixedPR] = useState<Array<number>>([1, 100]);

  useEffect(() => {
    sortStore.setPriceOrder('');
  }, []);
  useEffect(() => {
    sortStore.setPriceRange(Math.min(...fixedPR), Math.max(...fixedPR));
    sortStore.changePriceMax(Math.max(...fixedPR));
  }, [fixedPR]);

  useEffect(() => {
    if (sortStore.priceMax > 0) {
      setFoodList(
        foodStore.FoodItems.filter(item => {
          return item.price <= sortStore.priceMax;
        }),
      );
    }
  }, [sortStore.priceMax]);

  const handleChange = (text: string) => {
    if (text.length > 0) {
      setFoodList(
        foodStore.FoodItems.filter(item => {
          return item.title.toLowerCase().match(text.toLowerCase());
        }),
      );
      return;
    }
    setFoodList(foodStore.FoodItems);
  };

  useEffect(() => {
    FoodTiles();
  }, [foodlist]);

  useEffect(() => {
    setFoodList(foodStore.FoodItems);
  }, [sortStore.priceOrder]);

  useEffect(() => {
    setFixedPR([]);
    foodStore.FoodItems.map(food => {
      if (food.category == category) {
        setFixedPR(fixedPR => [...fixedPR, food.price]);
      }
    });
  }, [foodStore]);

  const FoodTiles = () => {
    return foodlist.map((food: Food) => {
      if (food.category == category) {
        return (
          <View key={food.id}>
            <FoodTile
              food={food}
              onPressDetails={() =>
                navigation.navigate('FoodDetails', {
                  food: food,
                })
              }
              onPressAdd={() => navigation.navigate('CartList')}
            />
          </View>
        );
      }
    });
  };

  return (
    <View>
      <AppBackground />

      <View style={Styles.cart}>
        <Cart onPress={() => navigation.navigate('CartList')} />
      </View>
      <Search
        onChangeText={text => handleChange(text)}
        onPressSort={() => modalStore.ModalVisibility(true)}
      />
      {modalStore.isModalVisible ? <Sort /> : null}
      <ScrollView>
        <View>{FoodTiles()}</View>
      </ScrollView>
    </View>
  );
};

export default FoodList;

const Styles = ScaledSheet.create({
  cart: {
    position: 'absolute',
    top: '540@s',
    left: '264@s',
    zIndex: 1,
  },
});
