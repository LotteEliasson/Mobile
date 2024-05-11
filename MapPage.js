import { getAuth, signOut} from 'firebase/auth';
import { app } from './firebaseTest';
import {StyleSheet, View, Text, Button, TouchableOpacity, Image} from 'react-native';
import MapView from 'react-native-maps';

const MapPage = ({navigation, route}) => {

  auth = getAuth(app);
  const userId = route.params?.userId;
  const userEmail = route.params?.userEmail;
  console.log("User Email: ", userEmail);


  async function sign_out(){
    await signOut(auth)
    console.log("Signed out")
    navigation.navigate('AuthPage');
  }

  return (
    <View style={styles.container}>
      <MapView
        style = {styles.map}
      >

      </MapView>


      <View style={styles.authContainer}>
        <Text style={styles.welcomeText}>Hello there {userEmail}</Text>
          <Button
          title='Sign Out'
          onPress={sign_out}
          color="#afc9c8"
          />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  map: { 
    flex: 1
  },
  container:{
    flex: 1
  }
})

export default MapPage;