import React, { createContext, useContext, useReducer, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

// Create context
const ExerciseContext = createContext();

// Reducer function for managing state
const exerciseReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: Date.now(), text: action.payload }];
        case "DELETE":
            return state.filter((item) => item.id !== action.payload);
        case "UPDATE":
            return state.map((item) =>
                item.id === action.payload.id ? { ...item, text: action.payload.text } : item
            );
        default:
            return state;
    }
};

// Provider component
const ExerciseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exerciseReducer, []);

    return (
        <ExerciseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExerciseContext.Provider>
    );
};

// CRUD Component
const Exercise6 = () => {
    const { state, dispatch } = useContext(ExerciseContext);
    const [text, setText] = useState("");
    const [editId, setEditId] = useState(null);

    const handleAdd = () => {
        if (text.trim() !== "") {
            dispatch({ type: "ADD", payload: text });
            setText("");
        }
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const handleEdit = (id, currentText) => {
        setEditId(id);
        setText(currentText);
    };

    const handleUpdate = () => {
        if (editId && text.trim() !== "") {
            dispatch({ type: "UPDATE", payload: { id: editId, text } });
            setEditId(null);
            setText("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise 6 - CRUD</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter text..."
                value={text}
                onChangeText={setText}
            />
            <Button title={editId ? "Update" : "Add"} onPress={editId ? handleUpdate : handleAdd} />
            <FlatList
                data={state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>{item.text}</Text>
                        <Button title="Edit" onPress={() => handleEdit(item.id, item.text)} />
                        <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#1E1E1E" },
    title: { fontSize: 22, fontWeight: "bold", color: "#E63946", marginBottom: 10, textAlign: "center" },
    input: { backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 5 },
    listItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#333", borderRadius: 5, marginBottom: 5 },
    itemText: { color: "#fff" },
});

// Export inside provider
export default function Exercise6Wrapper() {
    return (
        <ExerciseProvider>
            <Exercise6 />
        </ExerciseProvider>
    );
}
