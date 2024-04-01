import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationTypeList } from "./NavigationTypes";
import { NavigationContainer } from "@react-navigation/native";
import CreateEvent from "../screens/CreateEvent/CreateEvent";
import Feed from "../screens/Feed/Feed";
import Profile from "../screens/Profile/Profile";
import Events from "../screens/Events/Events";
import People from "../screens/People/People";
import { Feather } from "@expo/vector-icons";
import styles from "./TabNavigatorStyles";
import { useState } from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator<NavigationTypeList>();

export default function TabNavigator() {
  // const [isPressed, setIsPressed] = useState<boolean>(false);

  // const handlePress = () => {
  //   setIsPressed(true);
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false,  tabBarIcon: ({color}) => (
            <Feather style={styles.icons} name="home" color={color}
            />
          ) }}
          name="Feed"
          component={Feed}          
        /> 
        <Tab.Screen
          options={{ headerShown: false,  tabBarIcon: ({color}) => (
            <Feather style={styles.icons} name="calendar" color={color}
            />
          ) }}
          name="Events"
          component={Events}
        />
        <Tab.Screen
          options={{ headerShown: false,  tabBarIcon: ({color}) => (
            <Feather style={styles.plus} name="plus-square" color={color}
            />
          ) }}
          name="Create"
          component={CreateEvent}
        />
        <Tab.Screen
          options={{ headerShown: false,  tabBarIcon: ({color}) => (
            <Feather style={styles.icons} name="users" color={color}
            />
          ) }}
          name="People"
          component={People}
        />
        <Tab.Screen
          options={{ headerShown: false,  tabBarIcon: ({color}) => (
            <Feather style={styles.icons} name="user" color={color}
            />
          ) }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
