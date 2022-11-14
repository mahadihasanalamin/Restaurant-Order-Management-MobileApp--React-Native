import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import User from "../interfaces/User";
import { UseUserStore } from "../zustand/UserStore";
const MainNav: FC = () => {
  const userStore = UseUserStore();
  const [user, setUser] = useState<User>(userStore.user);
  useEffect(() => {
    setUser(userStore.user);
  }, [userStore]);
  return (
    <NavigationContainer>
      {user.uid ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default MainNav;
