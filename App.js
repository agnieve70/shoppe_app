import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { LogBox } from "react-native";

import * as Font from "expo-font";
import ReduxThunk from 'redux-thunk';
import * as SplashScreen from "expo-splash-screen";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);

    async function hideLoading() {
      return await SplashScreen.hideAsync();
    }

    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    const result = prepare();
    result.then(() => {
      const isHide = hideLoading();
      isHide.then(() => {
        setAppIsReady(true);
      });
    });
  });

  if (!appIsReady) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}