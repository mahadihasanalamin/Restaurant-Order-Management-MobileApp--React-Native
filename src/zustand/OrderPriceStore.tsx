import create from "zustand";

type State = {
  subTotal: number;
  deliveryCharge: number;
  changeOrderPrice: (subTotal: number, deliveryCharge: number) => void;
  emptyOrderPrice: () => void;
};

export const UseOrderPriceStore = create<State>((set) => ({
  deliveryCharge: 0,
  subTotal: 0,

  changeOrderPrice(subTotal: number, deliveryCharge: number) {
    set((state) => ({
      ...state,
      deliveryCharge: this.deliveryCharge + deliveryCharge,
      subTotal: this.subTotal + subTotal,
    }));
  },
  emptyOrderPrice() {
    set((state) => ({
      ...state,
      deliveryCharge: 0,
      subTotal: 0,
    }));
  },
}));
