import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button , FlatList, Pressable} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
//import { NativeModules } from 'react-native';
//import i18next from '../src/i18n.config';
//import { useTranslation } from 'react-i18next';
import Switch from '../Components/Switch';
import { useNavigation } from '@react-navigation/native'
import { TriangleColorPicker , ColorPicker } from 'react-native-color-picker'



function ColorScreen() {
    
    
      const [color, setColor] = useState('#3db2ff');
      const navigation=useNavigation();
      const onColorChange = color => {
        setColor(color);
    
        
      

       
      };
      const onColorSelection = color=>{
       console.log("selected color" ,color)
       alert("color Selected" , color)
       navigation.goBack();
      }
      return (
        <View style={{flex: 1, padding: 45, backgroundColor: '#212021'}}>
        <Text style={{color: 'white'}}>React Native Color Picker - Controlled</Text>
        <TriangleColorPicker
          color={color}
          onColorChange={onColorChange}
          onColorSelected={onColorSelection}
          
          style={{flex: 1}}
        />
      </View>
      );
}
export default ColorScreen;
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 70,
        paddingHorizontal: 24,
      },
})