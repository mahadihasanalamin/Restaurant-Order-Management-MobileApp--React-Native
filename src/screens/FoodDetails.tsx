import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {
  AddOnCheckbox,
  AddtoCartButton,
  DetailsFoodInfo,
  AddOnButton,
  AddOnImage,
} from '../components';
import {ScaledSheet} from 'react-native-size-matters';
import Food from '../interfaces/Food';
import {RouteProp, useRoute} from '@react-navigation/native';

import {UsePriceQuantityStore} from '../zustand/PriceQuantityStore'; //zustand
import {UseCartStore, CartItem} from '../zustand/CartStore'; //zustand
import {ScrollView} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
import {UseAddOnStore} from '../zustand/AddOnStore';
import AddOn from '../interfaces/AddOn';
import {UseAddOnList} from '../zustand/AddOnList';
import uuid from 'react-native-uuid';

type Props = NativeStackScreenProps<RootStackParamList>;

const FoodDetails: FC<Props> = () => {
  const [itemCount, setitemCount] = useState(0);
  const [addOn, setAddOn] = useState<Array<AddOn>>([]);
  const [addOnTotalPrice, setAddOnTotalPrice] = useState<number>(0);
  const [addOnItems, setAddOnItems] = useState<AddOn[]>([]);
  const addOnList = UseAddOnList();

  const router = useRoute<RouteProp<RootStackParamList, 'FoodDetails'>>();
  const params = router.params;
  const food: Food = params.food;

  const priceQuantityStore = UsePriceQuantityStore();
  const cartStore = UseCartStore();
  const addOnStore = UseAddOnStore();

  const AddToCart = () => {
    let cartid: string = uuid.v4().toString();
    const newCartItem: CartItem = {
      food,
      itemCount,
      addOn,
      cartid,
    };
    cartStore.AddCartItem(newCartItem);
    console.log(cartid);
  };

  useEffect(() => {
    priceQuantityStore.changePrice(food.price);
    priceQuantityStore.changeQuantity(1);
    addOnList.items.map(item => {
      if (item.category == food.category) {
        setAddOnItems(addOnItems => [...addOnItems, item]);
      }
    });
  }, []);

  useEffect(() => {
    setitemCount(priceQuantityStore.quantity);
  }, [priceQuantityStore]);

  useEffect(() => {
    setAddOn(addOnStore.items);
    let total = 0;
    addOnStore.items.map(item => {
      total += Number(item.price);
    });
    setAddOnTotalPrice(total);
  }, [addOnStore.items]);

  return (
    <ScrollView>
      <View>
        <SharedElement id={food.id}>
          <Image
            style={Styles.image}
            source={{
              uri: food.image,
            }}
          />
        </SharedElement>
        <View style={Styles.lowerpart}>
          {food.addonType == 'salad' ? null : <DetailsFoodInfo food={food} />}
          {food.addonType == 'checkbox' ? (
            <AddOnCheckbox addonlist={addOnItems} />
          ) : null}
          {food.addonType == 'button' ? (
            <AddOnButton
              headerText="Choose Your Sauce"
              addonlist={addOnItems}
            />
          ) : null}

          {food.addonType == 'salad' ? (
            <AddOnImage
              header="Choose base"
              price={155}
              items={[
                {name: 'Meat', image: '../../assets/images/tomato.png'},
                {name: 'Fish', image: '../../assets/images/tomato.png'},
                {name: 'Mix', image: '../../assets/images/tomato.png'},
              ]}
              selectionType="Single"
            />
          ) : null}

          {food.addonType == 'salad' ? (
            <AddOnImage
              header="Choose Protien"
              price={155}
              items={[
                {name: 'Crab', image: '../../assets/images/tomato.png'},
                {name: 'Chicken', image: '../../assets/images/tomato.png'},
                {name: 'Tuna Fish', image: '../../assets/images/tomato.png'},
              ]}
              selectionType="multiple"
            />
          ) : null}

          <View>
            <AddtoCartButton
              title="Add to cart"
              left={
                (
                  (priceQuantityStore.price + addOnTotalPrice) *
                  priceQuantityStore.quantity
                ).toString() + 'Kr'
              }
              right={priceQuantityStore.quantity?.toString()}
              onPress={() => AddToCart()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodDetails;

const Styles = ScaledSheet.create({
  image: {
    width: '350@s',
    height: '340@s',
    resizeMode: 'contain',
    backgroundColor: 'rgba(52, 52, 52, 0.15)',
    marginTop: 0,
  },
  lowerpart: {
    backgroundColor: '#F0F5F9',
    borderRadius: 10,
    paddingHorizontal: '10@s',
    paddingTop: '18@s',
  },
});
