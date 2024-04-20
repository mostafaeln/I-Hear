import { StatusBar } from 'expo-status-bar';
import { Image,StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './Screens/SplashScreen';
import MainScreen from './Screens/MainScreen';
import Recording from './Components/Recording';
import OptionsScreen from './Screens/OptionsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorScreen from './Screens/ColorScreen';
import MainScreenRS from './Screens/MainScreenRealtime';
export default function App() {
  const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator  screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="OptionsScreen" component={OptionsScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="MainScreenRT" component={MainScreenRS} options={{ headerShown: false }} />
       <MainStack.Screen 
        name="ColorScreen" 
        component={ColorScreen} 
        options={{ headerShown: false }} 
      />
      {/* Add other screens to the MainStack if needed */}
    </MainStack.Navigator>
  );
}

// Create your bottom tab navigator for screens A, B, and C
const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Home" 
          component={MainStackScreen} 
          options={{ 
            title: 'Home', 
            tabBarIcon: () => ( 
              <Ionicons 
                name="md-home"
                size={24} 
              /> 
            ), 
            // Add any other tab options as needed 
          }} 
        />
        <Tab.Screen 
          name="Options" 
          component={OptionsScreen} 
          options={{ 
            title: 'Options', 
            tabBarIcon: () => ( 
              <Ionicons 
                name="md-options"
                size={24} 
              /> 
            ), 
            // Add any other tab options as needed 
          }} 
        />
        {/* Add other screens to the bottom tab navigator */}
       
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    maxHeight:50,
    maxWidth:50
  }
});
