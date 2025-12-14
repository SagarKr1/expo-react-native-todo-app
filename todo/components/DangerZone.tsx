import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/hook/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';

const DangerZone = () => {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);

    const clearAllTodos = useMutation(api.todos.clearAllTodos);
    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "This will delete All todos permently. This action can not be undo.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert(
                                "App Reset",
                                "Successfully deleted.Your app has been reset.")
                        } catch (e) {
                            Alert.alert(
                                "Error",
                                "Fail to reset app"
                            )
                        }
                    }
                }
            ]
        )
    }
    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={styles.section}
        >
            <Text style={styles.sectionTitle}>Danger Zone</Text>

            <TouchableOpacity
                style={[styles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.8}
            >
                <View style={styles.actionLeft}>
                    <LinearGradient
                    colors={colors.gradients.danger}
                    style={styles.actionIcon}
                    >
                        <Ionicons name='trash' size={18} color="#fff"/>
                    </LinearGradient>
                    <Text style={styles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted}/>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone