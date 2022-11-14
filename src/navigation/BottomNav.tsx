import {NavigationContainer, TabRouter} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {FlipInEasyX} from 'react-native-reanimated';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {BottonNavButton, ItemBox} from '../components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './NavigationTypes';
import {Favorites, FoodList, Home, OrderList, Profile} from '../screens';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Width = Dimensions.get('window').width;
const BottomNav: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [Styles.tabBar],
        
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottonNavButton
              focus={focused}
              text="Home"
              icon={require('../../assets/icons/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <BottonNavButton
              focus={focused}
              text="Favorites"
              icon={require('../../assets/icons/fav.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="OrderList"
        component={OrderList}
        options={{
          tabBarIcon: ({focused}) => (
            <BottonNavButton
              focus={focused}
              text="Order List"
              icon={require('../../assets/icons/order.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <BottonNavButton
              focus={focused}
              text="Profile"
              icon={require('../../assets/icons/profile.png')}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomNav;

const Styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // top: '180@s',
  },
  tabBar: {
    height: scale(70),
    width: scale(350),
    borderRadius: 5,
    marginLeft: scale(0),
    backgroundColor: '#F0F5F9',
  },
});
