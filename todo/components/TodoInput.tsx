import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useTheme } from '@/hook/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TodoInput = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);
    const [todo,setTodo] = React.useState("");

    const addTodo = useMutation(api.todos.addTodos)
    const handleAddTodo = async ()=>{
        if(todo.trim()){
            try{
                await addTodo({text:todo.trim()});
                setTodo("");
            }catch(e){
                Alert.alert("Error","Fail to add todo");
            }
        }
    }

    return (
        <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder='Add new task'
                value={todo}
                onChangeText={setTodo}
                onSubmitEditing={handleAddTodo}
                placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!todo.trim()}>
                    <LinearGradient
                    colors={todo.trim() ? colors.gradients.primary:colors.gradients.muted}
                    style={[styles.addButton,!todo.trim() && styles.addButtonDisabled]}
                    >
                        <Ionicons name='add' size={24} color="#ffffff"/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput