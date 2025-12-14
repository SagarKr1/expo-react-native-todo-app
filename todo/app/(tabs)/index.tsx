import React from "react";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hook/useTheme";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Headers from "@/components/Headers";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { toggleTodos } from "@/convex/todos";
import EmptyState from "@/components/EmptyState";

type Todo = Doc<"todos">

export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const styles = createHomeStyles(colors);

  const [editingId, setEditingId] = React.useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = React.useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);
  const deleteTodo = useMutation(api.todos.deleteTodos);
  const updateTodo = useMutation(api.todos.updateTodos);



  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  }
  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editingText.trim() });
        setEditingId(null);
        setEditingText("");
      } catch (e) {
        Alert.alert("Error", "Fail to update todo");
      }
    }
  }
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  }


  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (e) {
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete todo", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id })
      }
    ])
  }
  const renderTodoItems = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={styles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[styles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}
            >
              {
                item.isCompleted &&
                <Ionicons name="checkmark" size={18} color="#fff" />
              }
            </LinearGradient>
          </TouchableOpacity>
          {
            isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  onChangeText={setEditingText}
                  autoFocus
                  placeholder="Edit your todo..."
                  value={editingText}
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                  onPress={handleSaveEdit}
                  activeOpacity={0.8}
                  >
                    <LinearGradient
                    colors={colors.gradients.success}
                    style={styles.editButton}
                    >
                      <Ionicons name="checkmark" size={16} color="#fff"/>
                      <Text style={styles.editButtonText}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                  >
                    <LinearGradient
                    colors={colors.gradients.muted}
                    style={styles.editButton}
                    >
                      <Ionicons name="close" size={16} color="#fff"/>
                      <Text style={styles.editButtonText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              </View>
            ) : (
              <View style={styles.todoTextContainer}>
                <Text style={[styles.todoText, item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6
                }]}>
                  {item.text}
                </Text>
                <View style={styles.todoActions}>
                  <TouchableOpacity
                    onPress={() => handleEditTodo(item)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={colors.gradients.warning}
                      style={styles.actionButton}
                    >
                      <Ionicons name="pencil" size={14} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { handleDeleteTodo(item._id) }}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={colors.gradients.danger}
                      style={styles.actionButton}
                    >
                      <Ionicons name="trash" size={14} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              </View>
            )}
        </LinearGradient>

      </View>

    )
  }
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar hidden={true} />
      <SafeAreaView
        style={styles.safeArea}
      >
        <Headers />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItems}
          keyExtractor={(item) => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={EmptyState}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
