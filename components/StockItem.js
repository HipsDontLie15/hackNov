// components/StockItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockItem = ({ stock }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.symbol}>{stock.symbol}</Text>
            <Text style={styles.price}>${stock.latestPrice}</Text>
            <Text style={styles.change}>Change: {stock.change}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    symbol: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
    },
    change: {
        fontSize: 14,
        color: stock.change >= 0 ? 'green' : 'red',
    },
});

export default StockItem;
