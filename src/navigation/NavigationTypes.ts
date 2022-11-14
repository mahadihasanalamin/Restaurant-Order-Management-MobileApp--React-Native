import Food from "../interfaces/Food";
import { Address } from "../interfaces/User";

export type RootStackParamList = {
  FoodList: { category: string };
  FoodTile: undefined;
  FoodDetails: { food: Food };
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Favorites: undefined;
  OrderList: undefined;
  BottomNav: undefined;
  CartList: undefined;
  MakePayment: undefined;
  TrackOrder: {orderId: string};
  SignIn: undefined;
  SignUp: undefined;
  AddressCategories: undefined;
  Addresses: undefined;
  AddAddress: {category: string};
  EditAddress: {address: Address};
  ForgotPassword: undefined;
};
