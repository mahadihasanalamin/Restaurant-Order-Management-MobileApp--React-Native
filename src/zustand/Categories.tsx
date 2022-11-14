import create from 'zustand';
import Category from '../interfaces/Category';

type State = {
  categories: Category[];

  AddCategory: (category: Category) => void;
  EmptyCategories: () => void;
};

export const UseCategoriesStore = create<State>(set => ({
  categories: [] as Category[],

  AddCategory(category: Category) {
    set(state => ({
      categories: [...state.categories, category],
    }));
  },

  EmptyCategories() {
    set(state => ({
      ...state,
      categories: [],
    }));
  },
}));
