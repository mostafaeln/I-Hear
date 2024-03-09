import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NativeModules } from 'react-native';
import i18next from '../src/i18n.config';
import { useTranslation } from 'react-i18next';
const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Arabic', value: 'ar' },
];
function changelanguage(language){
    if(language==="en") {
        i18next.changeLanguage('en')
    }
    else if(language==="ar") {
        i18next.changeLanguage('ar')
    }
}
const OptionsScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isFocus, setIsFocus] = useState(false);
 const {t} = useTranslation()
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        
      <View style={styles.container}>
        <Text style={styles.optionsText}>Options</Text>
        <View style={styles.optionContainer}>
          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>{t('Language')}</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});