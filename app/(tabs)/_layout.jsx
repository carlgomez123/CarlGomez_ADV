import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Layout() {
    return (
        <Tabs 
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#121212', 
                    borderTopWidth: 0,
                    elevation: 5,
                },
                tabBarActiveTintColor: "#E63946", 
                tabBarInactiveTintColor: "#888", 
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => 
                        <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen 
                name="exercises"
                options={{
                    title: "Exercises",
                    tabBarIcon: ({ color }) => 
                        <MaterialIcons size={28} name="fitness-center" color={color} />,
                }}
            />
        </Tabs>
    );
}
