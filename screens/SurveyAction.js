import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: 1,
    question: 'How confident are you in your knowledge of the topic?',
    options: ['Very Confident', 'Somewhat Confident', 'Neutral', 'Somewhat Unconfident', 'Very Unconfident'],
  },
  {
    id: 2,
    question: 'Do you feel prepared to discuss this topic with others?',
    options: ['Very Prepared', 'Somewhat Prepared', 'Neutral', 'Somewhat Unprepared', 'Very Unprepared'],
  },
  {
    id: 3,
    question: 'Have you had prior experience related to this topic?',
    options: ['Extensive Experience', 'Some Experience', 'A Little Experience', 'No Experience'],
  },
  {
    id: 4,
    question: 'How often do you engage with this topic?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'],
  },
  {
    id: 5,
    question: 'Would you seek help if you encountered difficulties related to this topic?',
    options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'],
  },
];

export default function KnowledgeSurveyScreen() {
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

  const calculateResult = () => {
    const confidenceLevel = responses[1]; // The response for the confidence question
    const preparednessLevel = responses[2]; // The response for the preparedness question
    const experienceLevel = responses[3]; // The response for the experience question

    if (confidenceLevel === 'Very Confident' && preparednessLevel === 'Very Prepared') {
      return 'You are likely very knowledgeable about the topic!';
    } else if (confidenceLevel === 'Somewhat Confident' || preparednessLevel === 'Somewhat Prepared') {
      return 'You seem to have a good understanding, but there is room for improvement.';
    } else if (experienceLevel === 'Extensive Experience') {
      return 'Your extensive experience indicates a strong grasp of the topic.';
    } else {
      return 'You may need to seek additional resources to improve your understanding.';
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
