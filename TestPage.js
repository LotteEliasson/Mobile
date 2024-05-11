import { getAuth, signOut} from 'firebase/auth';
import { app } from './firebaseTest';
import { View, Text, Button } from "react-native"
import MapPage from './MapPage';

import styles from './styles';

export default function TestPage({ navigation }){
  auth = getAuth(app);

  async function sign_out(){
    await signOut(auth)
    console.log("Signed out")
    navigation.navigate('MapPage');
  }



  return(
    <View style={styles.authContainer}>
      <Text>Hello there</Text>
        <Button
        title='Sign Out'
        onPress={sign_out}
        color="#afc9c8"
        />
    </View>
  )
}