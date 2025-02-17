import { useState } from "react";
import { Button, Text, View, Platform } from "react-native";

export default function State() {
    const [count, setCount] = useState(0);
    
    function handleOnPress() {
        setCount((prev) => prev + 1);
    }

    return (
        <View style={{ flex: 1, alignItems: "center", padding: 30, gap: 5 }}>
            <Text style={{ fontSize: Platform.OS === "web" ? 50 : 100, textAlign: "center" }}>
                {count}
            </Text>
            <Button 
                onPress={handleOnPress}
                title="Click me"
            />
        </View>
    );
}
