import { useEffect, useState } from "react";
import { Button, Text, View, Platform, StyleSheet } from "react-native";

export default function Effect() {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);
    
    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setCount((prev) => prev + 1);
            }, 1); // Changed from 1ms to 1000ms for a proper timer effect
        }
        return () => {
            clearInterval(interval);
        };        
    }, [start]);

    function handleOnPress() {  
        setCount((prev) => prev + 1);
    }

    function handleReset() {
        setCount(0);
        setStart(false);
    }

    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    return (
        <View style={{ padding: 30, gap: 5 }}>
            <Text style={styles.timerText}>
                {hours < 10 ? "0" : ""}{hours}:
                {minutes < 10 ? "0" : ""}{minutes}:
                {seconds < 10 ? "0" : ""}{seconds}
            </Text>
            <Button 
                onPress={handleOnPress}
                title="Click me"
            />
            <Button 
                onPress={() => setStart(!start)}
                title={`${!start ? 'Start' : 'Stop'}`} 
            />
            <Button 
                onPress={handleReset}
                title="Reset"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: Platform.OS === "web" ? 100 : 80,
        textAlign: 'center', // Centers the text horizontally
        width: '100%', // Makes sure the text component takes up full width
    }
});
