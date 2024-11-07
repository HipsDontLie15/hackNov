// SurveySelection.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SurveySelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Survey</Text>
      <Button
        title="Mood Survey"
        onPress={() => navigation.navigate('SurveyMood')}
      />
      <Button
        title="Action Survey"
        onPress={() => navigation.navigate('SurveyAction')}
      />
      <Button
        title="Meditation Moment"
        onPress={() => navigation.navigate('MeditationScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
