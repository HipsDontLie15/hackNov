// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchStockData } from '../services/api';
import StockItem from '../components/StockItem';

const HomeScreen = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']; // Example stock symbols

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const stockData = await Promise.all(stockSymbols.map(symbol => fetchStockData(symbol)));
                setStocks(stockData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Real-Time Trading</Text>
            <FlatList
                data={stocks}
                renderItem={({ item }) => <StockItem stock={item} />}
                keyExtractor={(item) => item.symbol}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
