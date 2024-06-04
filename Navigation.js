import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./screens/Login";
import SplashScreen from "./screens/SplashScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import UploadEcgScreen from "./screens/UploadEcgScreen";
import HeartConditionForm from "./screens/HeartConditionForm";
import PredictViaHeartForm from "./screens/PredictViaHeartForm";
import { HomeIcon, UserIcon } from "react-native-heroicons/solid";
import UserProfileScreen from './screens/UserProfileScreen'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#AA0000",
        tabBarInactiveTintColor:"black",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarStyle:{borderTopLeftRadius:25,borderTopRightRadius:25,height:50,borderWidth:4,borderColor:'black',},

      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <HomeIcon name="home" color={ color } size={32} />,
        }}
      />

      <Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <UserIcon name="home" color={ color } size={32} />,
        }}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="PredictViaHeartForm">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="HeartConditionForm" component={HeartConditionForm} />

        <Stack.Screen name="UploadEcgScreen" component={UploadEcgScreen} />   
        <Stack.Screen name="PredictViaHeartForm" component={PredictViaHeartForm}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
