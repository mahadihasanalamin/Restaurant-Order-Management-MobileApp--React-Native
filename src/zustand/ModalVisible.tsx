import create from 'zustand';

type State = {
  isModalVisible: boolean;
  ModalVisibility: (visible: boolean) => void;
};

export const UseModalStore = create<State>(set => ({
  isModalVisible: false,

  ModalVisibility(visible: boolean) {
    set(state => ({
      ...state,
      isModalVisible: visible,
    }));
  },
}));
