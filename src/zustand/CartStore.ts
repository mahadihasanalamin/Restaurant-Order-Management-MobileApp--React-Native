import create from "zustand";
import AddOn from "../interfaces/AddOn";
import Food from "../interfaces/Food";
import { UseAddOnStore } from "./AddOnStore";

type State = {
  totalPrice: number;
  cartItems: CartItem[];

  AddCartItem: (newCartItem: CartItem) => void;
  ChangeItemCount: (id: string, text: number) => void;
  UpdateTotalPrice: () => void;
  RemoveItem: (id: string) => void;
  EmptyCartStore: () => void;
};

export type CartItem = {
  cartid: string;
  food: Food;
  itemCount: number;
  addOn: AddOn[];
};

const ChangeQuantity = (cartItems: CartItem[], id: string, text: number) =>
  cartItems.map((item) => ({
    ...item,
    itemCount: item.cartid == id ? item.itemCount + text : item.itemCount,
  }));

const AddToTotalPrice = (cartItem: CartItem) => {
  let totalPrice = cartItem.food.price * cartItem.itemCount;
  cartItem.addOn.map((addon) => {
    totalPrice += Number(addon.price);
  });
  return totalPrice;
};

const UpdateTotalPrice = (cartItems: CartItem[]) => {
  if (cartItems.length == 0) return 0;
  let totalPrice = 0;
  cartItems.map((cartItem) => {
    totalPrice += cartItem.food.price * cartItem.itemCount;
    cartItem.addOn.map((addon) => {
      totalPrice += Number(addon.price);
    });
  });
  // console.log(totalPrice)
  return totalPrice;
};

const Remove = (cartItems: CartItem[], id: string) =>
  cartItems.filter((item) => item.cartid != id);

export const UseCartStore = create<State>((set) => ({
  totalPrice: 0,
  cartItems: [] as CartItem[],

  AddCartItem(newCartItem: CartItem) {
    set((state) => ({
      totalPrice: this.totalPrice + AddToTotalPrice(newCartItem),
      cartItems: [...state.cartItems, newCartItem],
    }));
  },

  ChangeItemCount(cartid, text) {
    set((state) => ({
      ...state,
      cartItems: ChangeQuantity(state.cartItems, cartid, text),
    }));
  },

  UpdateTotalPrice() {
    set((state) => ({
      ...state,
      totalPrice: UpdateTotalPrice(this.cartItems),
    }));
  },

  RemoveItem(id) {
    set((state) => ({
      ...state,
      cartItems: Remove(this.cartItems, id),
    }));
  },

  EmptyCartStore() {
    set((state) => ({
      ...state,
      cartItems: [],
    }));
  },
}));
