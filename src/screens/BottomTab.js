import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { CleanTabBar } from "react-navigation-tabbar-collection";
import { ColorfulTabBar } from "react-navigation-tabbar-collection";
import Icon from "react-native-vector-icons/AntDesign";
import Home from "./Home";
import Setting from "./Setting";
const Tab = createBottomTabNavigator();

const DemoScreen = ({ route }) => {
    return (
        <View style={styles.demoview}>
            <Text>{route.name}</Text>
        </View>
    );
};
// có thể sử dụng Clean hoặc Colorful hoặc Float(Beta)

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="TabScreen"
            screenOptions={{ headerShown: true }}
            tabBar={(props) =>
                <CleanTabBar
                    {...props}
                    openIcon={({ color, size }) => <Icon name="appstore-o" size={size} color={color} />}
                    closeIcon={({ color, size }) => <Icon name="close" size={size} color={color} />}
                />
            }
        >
            <Tab.Screen
                name="HomeScreen"
                component={Home}
                options={{
                    title: "Service",
                    tabBarIcon: ({ focused, color, size }) => <Icon name="home" size={size} color={color} />

                }}
            />
            <Tab.Screen
                name="Chat"
                component={DemoScreen}
                options={{
                    title: "Chat",
                    tabBarIcon: ({ focused, color, size }) => <Icon name="mail" size={size} color={color} />,
                    color: 'info'
                }}
            />
            <Tab.Screen
                name="Like"
                component={DemoScreen}
                options={{
                    title: "Like",
                    tabBarIcon: ({ focused, color, size }) => <Icon name="heart" size={size} color={color} />,
                    color: 'danger'
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    title: "Setting",
                    tabBarIcon: ({ focused, size, color }) => <Icon name="setting" size={size} color={color} />,
                    color: 'warning'
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({

})