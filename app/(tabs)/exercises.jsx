import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Animated, Keyboard, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router"; 

export default function AdminExercise() {
    const router = useRouter(); 

    const [exercises] = useState([
      { 
          title: 'Exercise 3', 
          description: 'Create Login Screen',
          fields: ['Email', 'Password'],
          navigateTo: '/activities/login'  
      },
      { 
          title: 'Exercise 4',
          description: 'Create Register Screen',
          fields: ['Image', 'Name', 'Email', 'Password'],
          navigateTo: '/activities/register'  
      },
      { 
          title: 'Exercise 5', 
          description: 'Stopwatch',
          navigateTo: '/apps'  // <--- Add this line

      },
      { 
          title: 'Exercise 6', 
          description: '',
      },
      { 
          title: 'Exercise 7', 
          description: '',
      },
      { 
          title: 'Exercise 8', 
          description: '',
      },
    ]);

    const [clickedIndex, setClickedIndex] = useState(null);
    const [animations] = useState(exercises.map(() => new Animated.Value(1)));
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            animations.forEach((anim) => {
                Animated.spring(anim, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            });
            setClickedIndex(null);
        }
    }, [isFocused]);

    const handlePress = (index) => {
        const exercise = exercises[index];

        if (exercise.navigateTo) {
            router.push(exercise.navigateTo); 
        } else {
            animations.forEach((anim, idx) => {
                Animated.spring(anim, {
                    toValue: idx === index ? (clickedIndex === index ? 1 : 1.08) : 1,
                    useNativeDriver: true,
                }).start();
            });
            setClickedIndex(clickedIndex === index ? null : index);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {exercises.map((exercise, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => handlePress(index)}>
                            <Animated.View style={[styles.card, { transform: [{ scale: animations[index] }] }]}> 
                                <View style={styles.innerCard}>
                                    <Text style={styles.title}>{exercise.title}</Text>
                                    {exercise.description && (
                                        <>
                                            <Text style={Platform.OS === 'web' ? styles.descriptionPC : styles.description}>{exercise.description}</Text>
                                            {exercise.fields && (
                                                <>
                                                    <Text style={styles.fieldsTitle}>{exercise.title.includes('Login') ? 'Login Screen Fields:' : 'Register Screen Fields:'}</Text>
                                                    {exercise.fields.map((field, i) => (
                                                        <Text key={i} style={styles.bulletPoint}>• {field}</Text>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    scrollContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    innerCard: {
        padding: 10,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E63946',
        textAlign: 'center',
        marginBottom: 5,
    },
    descriptionPC: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E63946',
        textAlign: 'center',
        marginBottom: 5,
    },
    fieldsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ddd',
        marginTop: 10,
    },
    bulletPoint: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
});
