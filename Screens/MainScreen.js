import * as React from "react";
import { StyleSheet, View, Text , Pressable ,Image, Button , ScrollView , FlatList} from "react-native";
import { FontFamily, FontSize, Color, Border  } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { useState , useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
//import * as tf from '@tensorflow/tfjs';
//import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Player } from 'react-native-audio-toolkit';
import axios  from "axios";
//import RNFetchBlob from 'rn-fetch-blob';
import { Permissions } from 'expo';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { FontAwesome5 , AntDesign , MaterialCommunityIcons , FontAwesome6 , MaterialIcons    } from '@expo/vector-icons'
import Constants from 'expo-constants';
//import RNFS from 'react-native-fs';

function MainScreen(){
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  function scheduleNotificationHandler(response){
    console.log("Notifications")
  Notifications.scheduleNotificationAsync({
    content:{ title:response , body:"Nearby Sound"  , data:{Username : "Mostafa"} },
    trigger:{
      seconds:1
    }
  })
  
  }
    const navigation=useNavigation()
    const [pressedtext , setpressedtext]= useState("Click To Record");
    const [pred , setpred]= useState("");
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [Result , setResult]=useState(false);
    const [images , setImages]=useState(null);
    function PredictionImage(response) {
      // Assuming setImage is obtained from useState hook
      console.log(response.pred);
      if (response.pred === "Car_horn") {
         return(
          //<Image style={styles.soundimage} source={require("../Images/carhorn.png") } />
          <AntDesign style ={styles.ionstyle} name="car" size={50} color="black" />)
         ;
      }  else if (response.pred  === "Dogs") {
        return(
          //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
          <FontAwesome5 style ={styles.ionstyle} name="dog" size={50} color="black" />
          )
         ;
         
          //setImages(require("../Images/sound.png"));
      }
      else if (response.pred  === "Ringtone") {
        return(
          //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
          <FontAwesome5  style ={styles.ionstyle} name="music" size={50} color="black" />
          )
         ;
        }
        else if (response.pred  === "crying") {
          return(
            //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
            <FontAwesome5  style ={styles.ionstyle} name="sad-cry" size={50} color="black" />
            )
           ;
          }
          else if (response.pred  === "Water") {
            return(
              //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
              <FontAwesome5  style ={styles.ionstyle} name="water" size={50} color="black" />
              )
             ;
            }
            else if (response.pred  === "Siren") {
              return(
                //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
                <MaterialCommunityIcons style ={styles.ionstyle} name="alarm-light" size={50} color="black" />
                )
               ;
              }
              else if (response.pred  === "Cat") {
                return(
                  //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
                  <FontAwesome6 style ={styles.ionstyle} name="cat" size={50} color="black" />
                  )
                 ;
                }
                else if (response.pred  === "Doorbell") {
                  return(
                    //<Image style={styles.soundimage} source={require("../Images/dog.png") } />
                    <MaterialCommunityIcons  style ={styles.ionstyle} name="doorbell" size={50} color="black" />

                    )
                   ;
                  }
                  else if (response.pred  === "Glass") {
                    return(
                 
                      <Image style={styles.soundimage} source={require("../Images/glass.png") } />
                      )
                     ;
                    }
      else {
      return(
        <Image style={styles.soundimage} source={require("../Images/sound.png") } />)
       ;
      }
  }
  

      // useEffect(() => {
      //   async function loadModel() {
      //     console.log("[+] Application started");
      //     // Wait for TensorFlow module to be ready
      //     await tf.ready();
      //     console.log("Started Loading Model");
      //     // Replace model.json and group1-shard.bin with your own custom model
      //     const modelWeights = require("../Components/group1-shards.bin");
      //     const modelJSON = require("../Components/model.json");
      //     const IHearModel = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
      //     console.log("Model Loaded");
      //     // You can call predict or any other function here if needed
      //   }
        
      //   loadModel(); // Call the loadModel function here
      // }, []); 
      
    
    const handleButtonPress = async () => {
     
     // await loadModel();
      try {
        console.log("[+] Predicting...");
        //const expopushtoken = await Notifications.getExpoPushTokenAsync({projectId: "<EXPO-PROJECT-ID>"});
        // Get the last recording
        const lastRecording = recordings[recordings.length - 1];
        const fileUri = lastRecording.file; // Get the file URI from the last recording
        const fileinfo = await FileSystem.getInfoAsync(fileUri)
        //console.log(fileinfo)
       // Replace with the URL of the WAV file to download
       
    
        const fileContents = await FileSystem.readAsStringAsync(fileUri ,  { encoding: FileSystem.EncodingType.Base64 });
        //console.log('File contents:', fileContents)
        const fileName ="recording.wav"
        const formData = new FormData();
       
       // const fileContent = await RNFS.readFile(fileUri, 'base64');
        console.log(fileUri)
        formData.append('file', {
          uri: fileUri,
          name: fileName,
          type: 'audio/wav',
          data:fileContents
        });
        
        try {
          const response = await axios.post('http://192.168.1.7:5000/upload', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          });
          //const responseData = await response.text();
          //console.log('Response:', responseData);
          console.log('Response:', response.data);
          console.log(response.status)
          setResult(true)
          
          
          //setpred(response.data)
          // const data = await response.json();
          // console.log('Response:', data['message']);
          if (response.status===200) {
            console.log('File uploaded successfully');
            setpred(response.data.prediction)
            scheduleNotificationHandler(response.data.prediction)
           
          } else {
            console.error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setpred("Error")
        }

            
      
      

      }
      catch(error) {
        console.error('Error uploading file:', error);
      }
      console.log("Finished")
      
    };
    
    async function startRecording() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('You need to enable permissions in order to receive notifications');
        }
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
          });
          const recordingOptions = {
              ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
              isMeteringEnabled: true, // Enable metering for WAV format
              android: {
                extension: '.wav', // Specify extension for Android
                outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_WAV, // Specify output format for Android
                audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM // Specify audio encoder for Android
              },
              ios: {
                extension: '.wav', // Specify extension for iOS
                outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM, // Specify output format for iOS
                audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX // Specify audio quality for iOS
              }
            };
            const { recording } = await Audio.Recording.createAsync(recordingOptions);
          
  
          setRecording(recording);
          setpressedtext("Recording")
        } else {
          setMessage("Please grant permission to app to access microphone");
        }
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    async function stopRecording() {
      setRecording(undefined);
      setpressedtext("Start Recording")
      await recording.stopAndUnloadAsync();
  
      let updatedRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });
      console.log(recording.getURI())
      
      
      setRecordings(updatedRecordings);
    }
  
    function getDurationFormatted(millis) {
      const minutes = millis / 1000 / 60;
      const minutesDisplay = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesDisplay) * 60);
      const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutesDisplay}:${secondsDisplay}`;
    }
  
    function getRecordingLines({ recordings }) {
        if (recordings.length === 0) {
          return null; // If there are no recordings, return null to render nothing
        }
      
        const lastRecording = recordings[recordings.length - 1]; // Get the last recording
      
        return (
          <View style={styles.row}>
            <Text style={styles.texting}> Recording - {lastRecording.duration}</Text>
            <Button style={styles.button} onPress={() => lastRecording.sound.replayAsync()} title="Play" />
            <Button style={styles.button} onPress={() => Sharing.shareAsync(lastRecording.file)} title="Share" />
            <Button style={styles.button} onPress={handleButtonPress}  title="Predict" />
          </View>
        );
      }
      
  
    // var IsRecording=false;
    // function pressbutton(){
    // console.log("pressed")
    // if(IsRecording==false){
    //     setpressedtext("Recording")
    //     IsRecording=true;
       
    // }
    // else{
    //     setpressedtext("Start Recording")
    //     IsRecording=false;

    // }
    // navigation.navigate("Recording")
    // }
  return (
    <View style={styles.home}>
    <Image
      style={styles.homeChild}
      contentFit="cover"
      source={require("../Images/vector-3.png")}
    />
    <Image
      style={[styles.ihear1Icon, styles.iconPosition1]}
      contentFit="cover"
      source={require("../Images/ihear-1.png")}
    />

    
    <Text style={styles.startListening}>{pressedtext}</Text>
    {/* <View style={[styles.kebabMenu, styles.kebabMenuLayout]}>
      <Image
        style={styles.kebabMenuChild}
        contentFit="cover"
        source={require("../Images/rectangle-19.png")}
      />
      <Image
        style={[styles.button1Icon, styles.kebabMenuLayout]}
        contentFit="cover"
        source={require("../Images/button-1.png")}
      />
    </View> */}

   
    
    <View>
    
    <Pressable
      onPress={recording ? stopRecording : startRecording}
      style= {styles.pressed}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}// Adjust hitSlop as needed
    >
    { recording ?
      <Image
        style={styles.recordinggif}
        source={require("../Images/recording.gif")}
      /> : <Image
      style={styles.imageihear}
      source={require("../Images/listen1.png")}
    /> }
    </Pressable>
      
    </View>
    <View style={styles.container}>
    {getRecordingLines({recordings})}
    
    </View>
    {Result ? (
  <View style={styles.output}>
    <Text style={styles.outputText}>The Sound Surrounding you is</Text>
    <View style={styles.sound}>
      {PredictionImage({pred})}
      <Text style={styles.resulttext}>{pred}</Text>
    </View>
  </View>
) : null}  
    </View>
);
}


export default MainScreen;
{/* <View>
      
<Pressable
  onPress={recording ? stopRecording : startRecording}
  style={[styles.listenIcon, styles.pressed]}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Adjust hitSlop as needed
>
  <Image
    style={styles.imageihear}
    source={require("../Images/listen1.png")}
  />
</Pressable>
</View> */}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
      },
    texting:{
        fontSize:18,
        color:'black',
        paddingRight:10
    },
    pressed:{
        resizeMode:'contain',

        height:155,
        width:150,
        top:300,
        alignItems:'center',
        alignSelf:'center',
        borderCurve:'circular',

       
    
     // component wherever you want within its parent
     // of the Pressable component

    },
    container: {
        
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        top:325
      },
  iconPosition1: {
    left: "50%",
    right:40,

    position: "absolute",
  },
  barLayout: {
    height: 83,
    width: 360,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  navigationBarPosition: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  backgroundPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  ionstyle:{
    marginLeft:20,
  },
  iconPosition: {
    bottom: 0,
    right: 0,
  },
  homeItemLayout: {
    height: 35,
    position: "absolute",
  },
  imageihear:{
            marginTop:300,

            maxHeight:200,
            maxWidth:175,
            bottom:320,
        },
  recordinggif:{
    marginTop:210,

    maxHeight:380,
    maxWidth:175,
    bottom:320,
  }     , 
  tabLayout: {
    height: 50,
    width: "25.06%",
    top: 0,
    position: "absolute",
  },
  guideTypo: {
    display: "flex",
    fontFamily: FontFamily.titleCaptionCaption112,
    lineHeight: 16,
    fontSize: FontSize.titleCaptionCaption112_size,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Color.colorGray_300,
    position: "absolute",
  },
  button: {
    marginHorizontal:'20'
  },
  symbolFlexBox: {
    fontFamily: FontFamily.sFProText,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Color.colorGray_300,
    letterSpacing: 0,
    left: "24.5%",
    top: "6%",
    width: "51.11%",
    height: "64%",
    position: "absolute",
  },
  homePosition: {
    left: 0,
    width: 360,
  },
  seperatorPosition: {
    borderRadius: Border.br_81xl,
    left: "50%",
    position: "absolute",
  },
  kebabMenuLayout: {
    height: 44,
    width: 44,
    position: "absolute",
  },
  homeChild: {
    top: -274,
    left: -296,
    width: 760,
    height: 691,
    position: "absolute",
  },
  ihear1Icon: {
    marginTop: -359,
    marginLeft: -180,
    width: 130,
    height: 75,
    top: "50%",
    left: "50%",
    overflow: "hidden",
  },
  backgroundIcon: {
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  backgroundIcon1: {
    left: 0,
    top: 0,
    position: "absolute",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  image44Icon: {
    top: 7,
    left: 116,
    borderRadius: Border.br_smi,
    width: 30,
  },
  background: {
    left: "0%",
  },
  symbol: {
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    color: Color.colorGray_300,
    letterSpacing: 0,
    left: "24.5%",
    top: "6%",
    width: "51.11%",
    height: "64%",
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_mid,
    position: "absolute",
  },

  tab3: {
    right: "24.81%",
    left: "50.14%",
  },
  symbol1: {
    fontSize: FontSize.size_lg,
  },
  tab4: {
    left: "74.94%",
    right: "0%",
    height: 50,
  },
  symbol2: {
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.sFProText,
  },
  guide: {
    top: "76%",
    left: "0%",
    width: "100%",
  },

  

  homeIndicator: {
    top: 762,
    height: 34,
    left: 0,
    position: "absolute",
  },
  startListening: {
    top: 62,
    left: 130,
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    textAlign: "center",
    fontFamily: FontFamily.poppinsRegular,
    position: "absolute",
  },
  kebabMenuChild: {
    top: 1,
    left: 1,
    borderRadius: Border.br_xs,
    width: 42,
    height: 42,
    position: "absolute",
  },
  button1Icon: {
    bottom: 0,
    right: 0,
  },
  kebabMenu: {
    top: 57,
    left: 287,
  },
  listenIcon: {
    marginLeft: -180,
    width: 333,
    height: 210,
    bottom:"300",
    left: "50%",
  },
  homeItem: {
    top: 684,
    borderTopLeftRadius: Border.br_base,
    borderTopRightRadius: Border.br_base,
    backgroundColor: Color.colorDeepskyblue,
    left: 0,
    width: 360,
  },
  seperator1: {
    marginLeft: -35.5,
    bottom: 13,
    backgroundColor: Color.colorAntiquewhite_300,
    width: 70,
    height: 4,
  },
  homeIndicatorStarter: {
    marginLeft: -97,
    top: 703,
    width: 193,
    height: 8,
  },
  home: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 800,
    overflow: "hidden",
    alignContent:'space-between',
    width: "100%",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:30,
    
  },
  fill: {
    flex: 1,
    margin: 16
  },
  
    sound:{
        backgroundColor:'#FFF',
        alignItems:'flex-start',
        marginTop:30,
        height:50,
        width:500,
        flexDirection:'row'
    },
    output:{
        alignItems:'center',
        backgroundColor:'#3db2ff',
        top:350,
        height:200,
        width:500,
        marginTop:15,
        alignContent:'space-between'
    },
    outputText:{
        color:'white',
      
        fontSize:18,
        right:70,
        alignSelf:'center'
    },
    resulttext:{
      color :'black' ,
      fontSize:18 ,
      left:80,
      alignSelf:'center'
    },
    soundimage:{
        maxHeight:100,
        marginBottom:200,
        maxWidth:100,
        
        bottom:30,
    }

});