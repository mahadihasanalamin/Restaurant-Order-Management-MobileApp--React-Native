import create from 'zustand';

type State = {
  price: number;
  quantity: number;
  changeQuantity: (qty: number) => void;
  changePrice: (pr: number) => void;
}

export const UsePriceQuantityStore = create<State>(set => ({
  quantity: 0,
  price: 0,

  changeQuantity(qty: number) {
    set(state => ({...state, quantity: qty}));
  },
  changePrice(pr: number) {
    set(state => ({...state, price: pr}));
  },
}));
