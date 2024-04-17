import { useNavigation } from '@react-navigation/native'
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'


function SplashScreen() {
const navigation = useNavigation();
function navigationhandler(){
  navigation.navigate('MainScreen')
}
setTimeout(() => {
    navigation.navigate('MainScreen'); 
}, 5000);
  return (
 <View style={styles.container}>
    <View>
    <Image style={styles.image} source={require('../Images/Ihear.png')} />
    </View>
    {/* <View>
        <Pressable style = {styles.button} onPress={navigationhandler}>
            <Text style={styles.text}>Continue</Text>
        </Pressable>
    </View> */}
 </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    image:{
        alignItems:'center',
        borderRightWidth:10,
        marginRight:45,
        maxHeight:310,
        maxWidth:310
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        paddingVertical:15,
        paddingHorizontal:12,
        backgroundColor:'#1979B7',
    },
    text:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    }
})
