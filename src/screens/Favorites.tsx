import React, { FC, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import AppBackground from "../AppBackground";
import { FoodTile } from "../components";
import Food from "../interfaces/Food";
import { UseFavoritesStore } from "../zustand/FavoritesList";
import { UseUserStore } from "../zustand/UserStore";

const Height = Dimensions.get("window").height;
const Favorites: FC = () => {
  const userStore = UseUserStore();
  const favoritesStore = UseFavoritesStore();
  const FoodTiles = () => {
    if (favoritesStore.FoodItems.length == 0) {
      return (
        <View style={Styles.emptyContainer}>
          <Image
            source={require("../../assets/icons/emptyFavoriteList.png")}
            style={Styles.image}
            resizeMode="contain"
          />
          <Text style={Styles.text}>Your favorite is empty!</Text>
        </View>
      );
    }
    return favoritesStore.FoodItems.map((food: Food) => {
        return (
          <View key={food.id}>
            <FoodTile food={food} />
          </View>
        );
    });
  };
   useEffect(() => {
     FoodTiles();
     console.log(favoritesStore.FoodItems.length)
   }, []);
  return (
    <View>
      <AppBackground />
      <ScrollView>
        <View>{FoodTiles()}</View>
      </ScrollView>
    </View>
  );
};

export default Favorites;

const Styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: "124.2@s",
    width: "124.18@s",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: "220@s",
  },
  text: {
    color: "#F0F5F9",
    fontWeight: "900",
    fontSize: 16,
    marginTop: "23.5@s",
  },
});
