import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: 1,
    question: 'How do you feel today?',
    options: ['Happy', 'Sad', 'Anxious', 'Excited', 'Bored'],
  },
  {
    id: 2,
    question: 'How energetic do you feel?',
    options: ['Very Energetic', 'Somewhat Energetic', 'Neutral', 'Somewhat Tired', 'Very Tired'],
  },
  {
    id: 3,
    question: 'Are you feeling stressed?',
    options: ['Not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely'],
  },
];

export default function SurveyScreen() {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleOptionSelect = (questionId, option) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: option,
    }));
    
    // Move to the next question after selecting an option
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleSubmit = () => {
    console.log('Survey responses:', responses);
    setShowResults(true);
  };

  const calculateResult = () => {
    const stressLevel = responses[3]; // The response for the stress question
    const energyLevel = responses[2]; // The response for the energy question
    const stringCon = 'affected by today\'s trading.';

    if (stressLevel === 'Extremely' || energyLevel === 'Very Tired') {
      return 'Highly Likely: You may be significantly ' + stringCon;
    } else if (stressLevel === 'Moderately' || energyLevel === 'Somewhat Tired') {
      return 'Likely: You might be affected by today\'s trading.';
    } else if (stressLevel === 'A little' || energyLevel === 'Neutral') {
      return 'Unlikely: You are not likely to be ' + stringCon;
    } else {
      return 'Highly Unlikely: You are probably not ' + stringCon;
    }
  };

  return (
    <View style={styles.container}>
      {!showResults ? (
        <>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${(currentQuestionIndex / questions.length) * 100}%` }]} />
          </View>
          <Text style={styles.questionCount}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Animated.View style={{ ...styles.questionContainer, opacity: fadeAnim }}>
            <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
            {questions[currentQuestionIndex].options.map(option => (
              <Button
                key={option}
                title={option}
                onPress={() => handleOptionSelect(questions[currentQuestionIndex].id, option)}
                color={responses[questions[currentQuestionIndex].id] === option ? 'green' : 'blue'}
              />
            ))}
          </Animated.View>
          <View style={styles.buttonContainer}>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity style={styles.fullWidthButton} onPress={previousQuestion}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{calculateResult()}</Text>
          <Button title="Restart Survey" onPress={() => {
            setResponses({});
            setCurrentQuestionIndex(0);
            setShowResults(false);
          }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
  },
  questionCount: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  fullWidthButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    width: '100%', // Ensures the button takes full width
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
