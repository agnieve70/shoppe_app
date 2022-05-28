import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { Platform } from 'react-native';

const ProductItem = (props) => {
  
    let TouchableComp = TouchableOpacity;

    if((Platform.OS === 'android' || Platform.OS ==='web') && Platform.Version >= 21){
        TouchableComp = TouchableNativeFeedback;
    }
    return (
      <View style={styles.product}>
        <View style={styles.touchableComp}>
          <TouchableComp onPress={props.onSelect} useForeground>
            <View>
              <Image style={styles.image} source={{ uri: props.image }} />
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>Php. {props.price ? props.price.toFixed(2) : 1.0}</Text>
              </View>
              <View style={styles.actions}>
                {props.children}
              </View>
            </View>
          </TouchableComp>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  details: {
    alignItems: "center",
    height: "25%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ProductItem;