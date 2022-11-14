import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import React, { FC, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { setdb } from "../../database/Firebase";
import Food from "../../interfaces/Food";
import { UseFavoritesStore } from "../../zustand/FavoritesList";
import { UseUserStore } from "../../zustand/UserStore";

interface Props {
  food: Food;
}
const AddFav: FC<Props> = (props) => {
  const favoritesStore = UseFavoritesStore();
  const [clicked, setClicked] = useState(false);
  const [fav, setFav] = useState(false);
  // const [color, setColor] = useState("#2A2630");
  const userStore = UseUserStore();

  useEffect(() => {
    favoritesStore.FoodItems.map((food: Food) => {
      if (food.id == props.food.id) {
        setFav(true);
      }
    });
  }, []);

  const addFav = () => {
    setClicked(true);
    if (fav) {
      setFav(false);
      return;
    }
    setFav(true);
    // setIcon(require("../../../assets/icons/fav.png"));
  };

  useEffect(() => {
    const AddFavFood = async () => {
      if (fav) {
        await setDoc(doc(setdb, "Favorites", props.food.id), {
          c_id: userStore.user.uid,
          title: props.food.title,
          subtitle: props.food.subtitle,
          image: props.food.image,
          price: props.food.price,
          category: props.food.category,
        });
        return;
      }
      const FavFood = doc(setdb, "Favorites", props.food.id);
      await deleteDoc(FavFood);
    };
    if (clicked) {
      AddFavFood();
    }
  }, [clicked, fav]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          addFav();
        }}
      >
        <Image
          style={{ height: 17.65, width: 20.01, resizeMode: "contain" , tintColor: fav?"#E5251A":"#2A2630"}}
          source={require("../../../assets/icons/fav.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddFav;
