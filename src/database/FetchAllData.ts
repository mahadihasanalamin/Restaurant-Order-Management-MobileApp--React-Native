import React, { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../database/Firebase";
import Food from "../interfaces/Food";
import AddOn from "../interfaces/AddOn";
import { UseAddOnList } from "../zustand/AddOnList";
import { UseFoodStore } from "../zustand/FoodMenuList";
import { UseCategoriesStore } from "../zustand/Categories";
import Category from "../interfaces/Category";
import { UseFavoritesStore } from "../zustand/FavoritesList";
import { Order, UseOrderStore } from "../zustand/OrderList";
import { UseUserStore } from "../zustand/UserStore";

const FetchAllData = () => {
  const addOnList = UseAddOnList();
  const foodStore = UseFoodStore();
  const categoriesStore = UseCategoriesStore();
  const favoritesStore = UseFavoritesStore();
  const orderStore = UseOrderStore();
  const userStore = UseUserStore();
  

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const colRef = collection(db, "Food_Categories");
        const unsub = onSnapshot(colRef, (snapshot) => {
          categoriesStore.EmptyCategories();
          snapshot.docs.map((doc) => {
            let category: Category = {
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
              layout: doc.data().layout,
            };
            categoriesStore.AddCategory(category);
          });
        });
        return unsub;
      } catch (err) {
        console.log(err);
      }
    };

    FetchCategories();

    const FetchMenu = async () => {
      try {
        const colRef = collection(db, "Food_menu");
        const unsub = onSnapshot(colRef, (snapshot) => {
          foodStore.EmptyItems();
          snapshot.docs.map((doc) => {
            let item: Food = {
              id: doc.id,
              title: doc.data().title,
              subtitle: doc.data().subtitle,
              image: doc.data().image,
              price: doc.data().price,
              category: doc.data().category,
              addonType: doc.data().addonType,
            };

            foodStore.AddFoodItem(item);
          });
        });
        return unsub;
      } catch (err) {
        console.log(err);
      }
    };

    const FetchFavorites = async () => {
      try {
        const colRef = collection(db, "Favorites")
        const unsub = onSnapshot(colRef, (snapshot) => {
          favoritesStore.EmptyItems();
          snapshot.docs.map((doc) => {
            let item: Food = {
              id: doc.id,
              title: doc.data().title,
              subtitle: doc.data().subtitle,
              image: doc.data().image,
              price: doc.data().price,
              category: doc.data().category,
              addonType: doc.data().addonType,
              cid: doc.data().c_id,
            };
            if (userStore.user.uid == doc.data().c_id) {
              favoritesStore.AddFoodItem(item);
            }
          });
        });
        return unsub;
      } catch (err) {
        console.log(err);
      }
    };

    const FetchAddOnList = async () => {
      try {
        const colRef = collection(db, "Add_On");
        const unsub = onSnapshot(colRef, (snapshot) => {
          addOnList.EmptyItems();
          snapshot.docs.map((doc) => {
            let item: AddOn = {
              id: doc.id,
              name: doc.data().name,
              price: doc.data().price,
              category: doc.data().category,
            };

            addOnList.AddItem(item);
          });
        });
        return unsub;
      } catch (err) {
        console.log(err);
      }
    };

    const FetchOrders = async () => {
      try {
        const colRef = collection(db, "Orders");
        const unsub = onSnapshot(colRef, (snapshot) => {
          orderStore.EmptyOrders();
          snapshot.docs.map((doc) => {
            if (doc.data().c_id == userStore.user.uid) {
              if(doc.data().schedule){
                let order: Order = {
                  oid: doc.id,
                  ordered_items: doc.data().ordered_items,
                  totalPrice: doc.data().totalPrice,
                  order_status: doc.data().order_status,
                  timestamp: doc.data().timestamp.toDate(),
                  schedule: doc.data().timestamp.toDate(),
                };
                orderStore.AddOrder(order);
                return;
              }
              let order: Order = {
                oid: doc.id,
                ordered_items: doc.data().ordered_items,
                totalPrice: doc.data().totalPrice,
                order_status: doc.data().order_status,
                timestamp: doc.data().timestamp.toDate(),
              };
              orderStore.AddOrder(order);
            }
          });
        });
        return unsub;
      } catch (err) {
        console.log(err);
      }
    };
    FetchOrders();
    FetchAddOnList();
    FetchMenu();
    FetchFavorites();
  }, []);
};

export default FetchAllData;
