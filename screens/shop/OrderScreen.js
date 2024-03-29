import React, {useEffect, useState} from "react";
import { View, FlatList, Platform, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/shop/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersAction from '../../store/actions/orders';
import Colors from "../../constants/Colors";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(()=> {
    setIsLoading(true);
    dispatch(ordersAction.fetchOrders()).then(response => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if(isLoading){
    return <View style={styles.centered}>
      <ActivityIndicator size={'large'} color={Colors.primary} />
    </View>
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions= navData => {
    return {
      headerTitle: "Your Orders",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
});

export default OrderScreen;
