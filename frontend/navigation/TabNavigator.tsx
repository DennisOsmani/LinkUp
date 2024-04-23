import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationTypeList } from "./NavigationTypes";
import { NavigationContainer } from "@react-navigation/native";
import CreateEvent from "../screens/CreateEvent/CreateEvent";
import Feed from "../screens/Feed/Feed";
import Profile from "../screens/Profile/Profile";
import Events from "../screens/MyEvents/Events";
import People from "../screens/People/People";
import { Feather } from "@expo/vector-icons";
import styles from "./TabNavigatorStyles";

const Tab = createBottomTabNavigator<NavigationTypeList>();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather style={styles.icons} name="home" color={color} />
            ),
            tabBarLabel: "Feed",
          }}
          name="Feed"
          component={Feed}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather style={styles.icons} name="calendar" color={color} />
            ),
            tabBarLabel: "Eventer",
          }}
          name="Events"
          component={Events}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather style={styles.plus} name="plus-square" color={color} />
            ),
            tabBarLabel: "Nytt Event",
            tabBarLabelStyle: styles.tabLabel,
          }}
          name="Create"
          component={CreateEvent}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather style={styles.icons} name="users" color={color} />
            ),
            tabBarLabel: "Personer",
          }}
          name="People"
          component={People}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather style={styles.icons} name="user" color={color} />
            ),
            tabBarLabel: "Profil",
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
