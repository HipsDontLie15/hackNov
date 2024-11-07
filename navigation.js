// navigation.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SurveySelection from './screens/SurveySelection';
import SurveyMood from './screens/SurveyMood';
import SurveyAction from './screens/SurveyAction';
import MeditationScreen from './screens/MeditationScreen';
import HomeScreen from './screens/Home';

const Stack = createNativeStackNavigator();

export default function RootApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="SurveySelection" component={SurveySelection} />
                <Stack.Screen name="SurveyMood" component={SurveyMood} />
                <Stack.Screen name="SurveyAction" component={SurveyAction} />
                <Stack.Screen name="MeditationScreen" component={MeditationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
