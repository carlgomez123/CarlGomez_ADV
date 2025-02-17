import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import { PanGestureHandler, GestureHandlerRootView, State } from "react-native-gesture-handler";

export default function Home() {
    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const [index, setIndex] = useState(1); 

    const content = [
        "Information Technology - 2nd Year", 
        "Carl Christian Son B. Gomez", 
        "ADV 102" 
    ];

    const handleGesture = (event) => {
        const { translationX, state } = event.nativeEvent;

        if (state === State.END) {
            let newIndex = index;

            if (translationX > 30 && index > 0) {
                newIndex = index - 1; 
            } else if (translationX < -30 && index < content.length - 1) {
                newIndex = index + 1; 
            }

            if (newIndex !== index) {
                animateContentChange(newIndex);
            }
        }
    };

    const animateContentChange = (newIndex) => {
        Animated.sequence([
            Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true })
        ]).start();

        setIndex(newIndex);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.card}>
                <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleGesture}>
                    <Animated.View style={{ opacity }}>
                        <Text style={styles.text}>{content[index]}</Text>
                    </Animated.View>
                </PanGestureHandler>
                
                <View style={styles.indicatorContainer}>
                    {content.map((_, i) => (
                        <TouchableOpacity key={i} onPress={() => animateContentChange(i)}>
                            <View style={[styles.indicator, index === i && styles.activeIndicator]} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#111', 
        paddingVertical: 25,
        paddingHorizontal: 50,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#222', 
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E63946', 
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        letterSpacing: 1.5,
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 5,
    },
    indicator: {
        width: 40, 
        height: 4,
        backgroundColor: '#555', 
        borderRadius: 2,
    },
    activeIndicator: {
        backgroundColor: '#E63946', 
    },
});
