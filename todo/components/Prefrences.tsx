import { View, Text, Switch } from 'react-native'
import React from 'react'
import { useTheme } from '@/hook/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Prefrences = () => {
    const [isNotificationEnable, setIsNotificationEnable] = React.useState(true);
    const [isAutoSync, setIsAutoSync] = React.useState(true);
    const { colors, toggleDarkMode, isDarkMode } = useTheme();
    const styles = createSettingsStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={styles.section}
        >
            <Text style={styles.sectionTitle}>Prefrences</Text>
            {/* Dark Mode */}
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.primary}
                        style={styles.settingIcon}
                    >
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Dark Mode</Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.primary }}
                />
            </View>
            {/* Notification */}
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.warning}
                        style={styles.settingIcon}
                    >
                        <Ionicons name='notifications' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Notification</Text>
                </View>
                <Switch
                    value={isNotificationEnable}
                    onValueChange={() => setIsNotificationEnable(!isNotificationEnable)}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.warning }}
                />
            </View>
            {/* Auto Sync */}
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.success}
                        style={styles.settingIcon}
                    >
                        <Ionicons name='repeat' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.settingText}>Auto Sync</Text>
                </View>
                <Switch
                    value={isAutoSync}
                    onValueChange={() => setIsAutoSync(!isAutoSync)}
                    thumbColor="#fff"
                    trackColor={{ false: colors.border, true: colors.success }}
                />
            </View>
        </LinearGradient>
    )
}

export default Prefrences