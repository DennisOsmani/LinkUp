import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationTypeList } from './NavigationTypes';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator<NavigationTypeList>();

export function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name='Feed'
          component={<Feed />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name='Events'
          component={<Events />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name='Create'
          component={<Create />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name='Friends'
          component={<Friends />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name='Profile'
          component={<Profile />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
