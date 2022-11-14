import create from 'zustand';
import AddOn from '../interfaces/AddOn';
type State = {
  items: AddOn[];

  AddItem: (newItem: AddOn) => void;
  RemoveItem: (item: AddOn) => void;
  EmptyItems: () => void;
};

const remove = (items: AddOn[], itm: AddOn) =>
  items.filter(item => item.name != itm.name);

export const UseAddOnStore = create<State>(set => ({
  item: {} as AddOn,
  items: [] as AddOn[],

  AddItem(newItem: AddOn) {
    set(state => ({
      items: [...state.items, newItem],
    }));
  },

  RemoveItem(item: AddOn) {
    set(state => ({
      ...state,
      items: remove(state.items, item),
    }));
  },

  EmptyItems() {
    set(state => ({
      ...state,
      items: [],
    }));
  },
}));
