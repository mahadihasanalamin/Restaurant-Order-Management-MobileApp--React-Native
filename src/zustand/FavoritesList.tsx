import create from 'zustand';
import AddOn from '../interfaces/AddOn';
import Food from '../interfaces/Food';

type State = {
  FoodItems: Food[];

  AddFoodItem: (newFoodItem: Food) => void;
  EmptyItems: () => void;
};

export const UseFavoritesStore = create<State>(set => ({
  FoodItems: [] as Food[],

  AddFoodItem(newFoodItem: Food) {
    set(state => ({
      FoodItems: [...state.FoodItems, newFoodItem],
    }));
  },

  EmptyItems() {
    set(state => ({
      ...state,
      FoodItems: [],
    }));
  },
}));
