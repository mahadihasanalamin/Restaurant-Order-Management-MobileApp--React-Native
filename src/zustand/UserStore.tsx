import create from "zustand";
import User from "../interfaces/User";

type State = {
  user: User;

  AddUser: (user: User) => void;
  EmptyUserStore: () => void;
};

export const UseUserStore = create<State>((set) => ({
    user: {} as User,

    AddUser(user) {
        set(state =>({
            ...state,
            user: user
        }))
    },
    EmptyUserStore() {
        set(state =>({
            ...state,
            user: {} as User,
        }))
    },
}));
