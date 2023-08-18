import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';
import SearchScreen from './screens/search';
import DeleteScreen from './screens/delete'; // Import the DeleteScreen component
import firebase from 'firebase';
import { firebaseConfig } from './config';
import Ionicons from '@expo/vector-icons/Ionicons';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} /> 
    </Stack.Navigator>
  );
};
const TabNavigator = () =>{
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel:false,
      headerShown: false,    tabBarStyle: { backgroundColor: 'pink', borderRadius:50, marginBottom:15, position:'absolute', alignSelf:'center' },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Search") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }
        return (
          <Ionicons
            name={iconName}
            size={32}
            color={color}
            style={{marginTop:19}}
          />
        );
      }

    })}
   >
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={DeleteScreen} />
  </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
