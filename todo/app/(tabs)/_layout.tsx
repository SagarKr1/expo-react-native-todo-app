import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import {Ionicons} from "@expo/vector-icons";
import { useTheme } from '@/hook/useTheme';

const _layout = () => {
    const {colors} = useTheme();
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor:colors.primary,
            tabBarInactiveTintColor:colors.textMuted,
            tabBarStyle:{
                backgroundColor:colors.surface,
                borderTopWidth:1,
                borderTopColor:colors.border,
                height:90,
                paddingTop:10,
                paddingBottom:30
            },
            tabBarLabelStyle:{
                fontSize:16,
                fontWeight:"bold"
            },
            headerShown:false
        }}
        >
            <Tabs.Screen 
            name='index'
            options={{
                title:"Todos",
                tabBarIcon:({color,size})=>(
                    <Ionicons name='flash-outline' size={size} color={color}/>
                )
            }}
            />
            <Tabs.Screen 
            name='settings'
            options={{
                title:"Setting",
                tabBarIcon:({color,size})=>(
                    <Ionicons name='settings'size={size} color={color}/>
                )
            }}
            />
        </Tabs>
    )
}

export default _layout;