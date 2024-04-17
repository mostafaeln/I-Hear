import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button , FlatList, Pressable} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
//import { NativeModules } from 'react-native';
//import i18next from '../src/i18n.config';
//import { useTranslation } from 'react-i18next';
import Switch from '../Components/Switch';
import { useNavigation } from '@react-navigation/native'
import { ColorPicker } from 'react-native-color-picker'
import { SliderBase } from '@react-native-community/slider';

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Italy', value: 'it'}
];
// function changelanguage(language){
//     if(language==="en") {
//         i18next.changeLanguage('en')
//     }
//     else if(language==="ar") {
//         i18next.changeLanguage('ar')
//     }
//     else if (language==="de"){
//       i18next.changeLanguage('de')
//     }
//     else if (language==="it"){
//       i18next.changeLanguage('it')
//     }
//     else if (language==="es"){
//       i18next.changeLanguage('es')
//     }
//     else if (language==="fr"){
//       i18next.changeLanguage('fr')
//     }
// }
const Data = [
    {
        id: '1',
        title: 'Car Horn',
        color:'#3db2ff'
      },
      {
        id: '2',
        title: 'Cat',
        color:'#3db2ff'
      },
      {
        id: '3',
        title: 'Dog',
        color:'#3db2ff'
      },
      {
        id: '4',
        title: 'Doorbell',
        color:'#3db2ff'
      },
      {
        id: '5',
        title: 'Glass',
        color:'#3db2ff'
      },
      {
        id: '6',
        title: 'crying',
        color:'#3db2ff'
      },
      {
        id: '7',
        title: 'Fire Alarm',
        color:'#3db2ff'
      },
      {
        id: '8',
        title: 'Ringtone',
        color:'#3db2ff' 
    },
      {
        id: '9',
        title: 'Siren',
        color:'#3db2ff'
      },
      {
        id: '10',
        title: 'Water',
        color:'#3db2ff'
      },
     
    
    ]

const OptionsScreen = () => {

    const [selectedColor, setSelectedColor] = useState('#3db2ff');
    const handleColorChange = (color) => {
        setSelectedColor(color);
        alert(`Color selected: ${color}`)
      };

    function onColorChange(color){
     console.log("pressed");   
     navigation.navigate('ColorScreen')
  

    }

    const Item = ({title , color}) => (
        <Pressable style={[styles.item, { backgroundColor: color }]} onPress={onColorChange}>
          <Text style={styles.title}>{title}</Text>
        </Pressable>
      );
  const navigation = useNavigation();
  function onSelectSwitch(index){
    if(index ===1){
      alert("You Have Chosen : Outdoors Mode");
      console.log("outdoors")
      navigation.navigate("MainScreen" , {
      mode:"Outdoors"
      })
    }
    else if(index ===2){
      console.log("indoors")
      alert("You Have Chosen : Indoors Mode");
      navigation.navigate("MainScreen" , {
        mode:"Indoors"
        })
    }
    
    }
    function onPressClear(){
    
          console.log("All")
          navigation.navigate("MainScreen" , {
          mode:"All"
          })
        }
        
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isFocus, setIsFocus] = useState(false);
 //const {t} = useTranslation()
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        
      <View style={styles.container}>
        <Text style={styles.optionsText}>Options</Text>
        <View style={styles.optionContainer}>
          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Language</Text>
            <View style={styles.sectionContent}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={languageOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select language' : '...'}
                searchPlaceholder="Search..."
                value={selectedLanguage}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedLanguage(item.value);
                  changelanguage(item.value)
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
          </View>
         
          {/* Add more option sections here */}
        </View>
        <View style ={styles.mode}>
            <Text style={styles.text}>Select Mode</Text>
            <Switch
          selectionMode={1}
          roundCorner={true}
          option1={'Outdoors'}
          option2={'Indoors'}
          option3={'All'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={'blue'}
        />
          </View>
        {/* <Button title = "clear Selection" onPress={onPressClear}></Button> */}
        <View style = {styles.list}>
        <Text style={styles.result}>Customize Results</Text>
        <FlatList
        data={Data}
        renderItem={({item}) => <Item title={item.title} color={selectedColor} />}
        keyExtractor={item => item.id}
      />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
    list:{
        marginVertical:20,
        
    },
    result:{
        fontSize:22,
        fontWeight:'bold',
        marginBottom:10
    },
  mode:{
    flexDirection:'row',
    alignContent:'space-between'
  },
  text:{
    fontSize:18 , 
    fontWeight:'bold',
    left:10,
    marginTop:10,
    marginRight:30
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  title: {
    fontSize: 18,
    alignSelf:'center',
    color:'#FFF'
  },
  optionsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  optionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 8,
  },
  sectionContent: {
    borderRadius: 8,
    padding: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  sectionContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});