import create from 'zustand';
import AddOn from '../interfaces/AddOn';
type State = {
  items: AddOn[];

  AddItem: (newItem: AddOn) => void;
  EmptyItems: () => void;
};

export const UseAddOnList = create<State>(set => ({
  // item: {} as AddOn,
  items: [] as AddOn[],

  AddItem(newItem: AddOn) {
    set(state => ({
      items: [...state.items, newItem],
    }));
  },

  EmptyItems() {
    set(state => ({
      ...state,
      items: [],
    }));
  },
}));
