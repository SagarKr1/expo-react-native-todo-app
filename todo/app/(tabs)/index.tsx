import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hook/useTheme";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";


export default function Index() {
  const { toggleDarkMode, colors } = useTheme()

  const styles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar hidden={true} />
      <SafeAreaView
        style={styles.safeArea}
      >
        <View
          style={styles.container}
        >
          <Text>Edit app/index.tsx to edit this screen.</Text>
          <TouchableOpacity onPress={toggleDarkMode}>
            <Text>Toggle Background</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
