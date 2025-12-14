import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/hook/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Progress from '@/components/Progress';
import Prefrences from '@/components/Prefrences';
import DangerZone from '@/components/DangerZone';

const settings = () => {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={styles.container}
        >
            <SafeAreaView
                style={styles.safeArea}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <LinearGradient
                            colors={colors.gradients.primary}
                            style={styles.iconContainer}
                        >
                            <Ionicons name='settings' size={28} color="#ffffff" />
                        </LinearGradient>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                </View>

                <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                >
                    <Progress/>
                    <Prefrences/>
                    <DangerZone/>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default settings