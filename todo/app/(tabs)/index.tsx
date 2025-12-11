import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hook/useTheme";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Headers from "@/components/Headers";
import TodoInput from "@/components/TodoInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const styles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
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

        {
          todos?.map((todo)=>{
            return (
              <Text key={todo._id}>{todo.text}</Text>
            )
          })
        }
      </SafeAreaView>
    </LinearGradient>
  );
}
