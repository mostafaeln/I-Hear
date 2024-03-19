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
import { useTranslation } from 'react-i18next';

export default function App() {
  const stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {t} = useTranslation();
  function ScreensBT(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainScreen" component={MainScreen}  options={{
        title:t('Home'),
        tabBarIcon: () => { 
          return ( 
            <Ionicons 
              name="md-home"
              size={24} 
            
            /> 
          ); 
        }, 
        headerShown:false , tabBarStyle: { position: 'absolute'  }}}/>
      <Tab.Screen name="OptionsScreen" component={OptionsScreen}  options={{
        title:t('Options'),
        tabBarIcon: () => { 
          return ( 
            <Ionicons 
              name="md-options"
              size={24} 
            
            /> 
          ); 
        }, 
        headerShown:false , tabBarStyle: { position: 'absolute'  }}}/>  
      {/* <Tab.Screen name="Pairing" component={PairingScreen} />
      <Tab.Screen name="Options" component={OptionsScreen} />
      <Tab.Screen name="Customization" component={CustomizationScreen} /> */}
    </Tab.Navigator>
  );
  }
  return (
    //<View style={styles.container}>
    
   
    <NavigationContainer>
     
      <stack.Navigator  screenOptions={{
      
      }}>
      <stack.Screen name="ScreensBT" component={ScreensBT} options={{headerShown:false}} />
      {/* <stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}></stack.Screen> */}
      
        <stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}} ></stack.Screen>
        <stack.Screen name="Recording" component={Recording} options={{headerShown:false}} ></stack.Screen>
       
      </stack.Navigator>
        
      </NavigationContainer>
  
     // <StatusBar style="auto" />
    //</View>
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
