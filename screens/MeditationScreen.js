import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Animated,
    Easing,
    Alert,
} from 'react-native';

const MeditationScreen = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(120); // 2 minutes in seconds
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isBreathing) {
            startBreathingAnimation();
            const timer = setInterval(() => {
                setSecondsRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsBreathing(false);
                        Alert.alert("Time's up!", "You have completed your meditation session.");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isBreathing]);

    const startBreathingAnimation = () => {
        scaleAnim.setValue(1);
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 1000, // Expand duration
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000, // Contract duration
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const handleStart = () => {
        setIsBreathing(true);
        setSecondsRemaining(120); // Reset timer
    };

    const formattedTime = () => {
        const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
        const seconds = String(secondsRemaining % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meditation Session</Text>
            <Text style={styles.breathInstruction}>Breathe in...</Text>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <View style={styles.circle} />
            </Animated.View>
            <Text style={styles.breathInstruction}>Breathe out...</Text>
            <Text style={styles.timer}>{formattedTime()}</Text>
            <Button title="Start Meditation" onPress={handleStart} disabled={isBreathing} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA', // Light blue background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    breathInstruction: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#4DB6AC', // Teal circle
    },
    timer: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});

export default MeditationScreen;
