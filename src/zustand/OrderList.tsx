import { Timestamp } from "firebase/firestore";
import create from "zustand";
import { CartItem } from "./CartStore";

type State = {
  orders: Order[];

  AddOrder: (Order: Order) => void;
  EmptyOrders: () => void;
};
export type Order = {
  oid: string;
  ordered_items: CartItem[];
  totalPrice: number;
  order_status: string;
  timestamp: Date;
  schedule?: Date;
};
export const UseOrderStore = create<State>((set) => ({
  orders: [] as Order[],
  AddOrder(Order) {
    set((state) => ({
      orders: [...state.orders, Order],
    }));
  },
  EmptyOrders() {
    set((state) => ({
      ...state,
      orders: [],
    }));
  },
}));
