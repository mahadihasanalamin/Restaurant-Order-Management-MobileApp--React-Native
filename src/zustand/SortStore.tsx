import create from 'zustand';

type State = {
  sortBy: string;
  priceOrder: string;
  priceRange: {min: number; max: number};
  priceMax: number;

  setSortBy: (sortBy: string) => void;
  setPriceOrder: (priceOrder: string) => void;
  setPriceRange: (min: number, max: number) => void;
  changePriceMax: (priceMax: number) => void;
};

export type Sort = {
  sortBy: string;
  priceType: string;
  priceRange: {min: number; max: number};
};

export const UseSortStore = create<State>(set => ({
  sortBy: '',
  priceOrder: '',
  priceRange: {min: 0, max: 0},
  priceMax: 0,

  setSortBy(sortBy) {
    set(state => ({
      ...state,
      sortBy: sortBy,
    }));
  },

  setPriceOrder(priceOrder) {
    set(state => ({
      ...state,
      priceOrder: priceOrder,
    }));
  },
  setPriceRange(min, max) {
    set(state => ({
      ...state,
      priceRange: {min, max},
    }));
  },
  changePriceMax(priceMax) {
      set(state=>({
        ...state,
        priceMax: priceMax,
      }))
  },
}));
