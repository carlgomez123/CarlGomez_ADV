import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Animated, Keyboard, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router"; // Import the router hook
import { Alert } from "react-native"; // Import Alert at the top


export default function AdminExercise() {
    const router = useRouter(); // Hook to manage navigation

    const [exercises] = useState([
        { 
          title: 'Exercise 1', 
          description: 'Create Home Screen Page',
          navigateTo: '/(tabs)/'  // Path to the Home Screen (index.jsx)
        },
        { 
          title: 'Exercise 2', 
          description: 'Create Exercise Page',
        },
        { 
          title: 'Exercise 3', 
          description: 'Create Login Screen',
          navigateTo: '/activities/login'  
        },
        { 
          title: 'Exercise 4', 
          description: 'Stopwatch',
          navigateTo: '/apps'  // Add path for Stopwatch
        },
        { 
            title: 'Exercise 5',
            description: 'Create Register Screen',
            navigateTo: '/activities/register'  
        },
        { 
            title: 'Exercise 6',
            description: 'CRUD',
            navigateTo: '/CRUD/exercise6'  
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

        if (exercise.title === "Exercise 2") {
            if (Platform.OS === "web") {
                window.alert("You are in the Exercise 2 page!"); // Web popup
            } else {
                Alert.alert("Exercise 2", "You are in the Exercise 2 page!", [{ text: "OK" }]); // Mobile popup
            }
            return;
        }

        console.log("Navigating to:", exercise.navigateTo);  // <-- Add this to check the navigation path


        if (exercise.navigateTo) {
            router.push(exercise.navigateTo); // Navigate to the path when an exercise is clicked
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
});
