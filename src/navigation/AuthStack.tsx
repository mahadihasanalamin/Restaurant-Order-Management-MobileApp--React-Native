import React, {FC} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SignIn, SignUp, ForgotPassword} from '../screens';
import {RootStackParamList} from '../navigation/NavigationTypes';
import {useNavigation} from '@react-navigation/native';

const AuthStack: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
