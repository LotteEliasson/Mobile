
import { app } from './firebaseTest';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, View, TouchableOpacity, Image, Text, Modal, Animated, ImageBackground, TextInput, Button } from "react-native";
import { useState, useRef, useEffect } from "react";

import styles from "./styles";


let auth
if(Platform.OS === 'web'){
  auth = getAuth(app)
}else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
}

const AuthPage = ({ navigation }) => {

  const [loginModalVisible, setLoginModalVisible ] = useState(false)
  const scaleValue = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const[userId, setUserId] = useState(null);
  const[userEmail, setUserEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const auth_ = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      if(currentUser && !isSignUp){
        if (userId !== currentUser.uid) setUserId(currentUser.uid);
        if (userEmail !== currentUser.email) setUserEmail(currentUser.email);
      }else{
        setUserId(null)
        setUserEmail(null)
        console.log("All good")
        
      }
    })
    return () => unsubscribe()
  },[isSignUp])
 

  useEffect(() => {
    if (userId) {
      navigation.navigate('MapPage', {
        userId: userId,
        userEmail: userEmail,
      });
    }
  }, [userId, userEmail, navigation]);


const handleAuth = async () => {
  try{
  
    let userCredentials;
    if(isSignUp) {
      userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      userCredentials = await signInWithEmailAndPassword(auth, email, password);
    }
    alert(`Success: ${userCredentials.user.email}`);
  }catch(error){
    console.error(`Auth failed: `, error)
    alert(`Failed; ${error.message}`);
  }
  hideModal();
}

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  }
  
  const showModal = (signUp = false) => {
    setIsSignUp(signUp);
    setEmail('');
    setPassword('');
    setLoginModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setLoginModalVisible(false)); // Hide after animation
  };

  return(
    <ImageBackground
      source={require('./assets/Welcome.png')} 
      style={styles.backgroundImage} 
      resizeMode="cover" 
    >
    <View style={styles.authContainer}>
    
        <View style={styles.topContainer}>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </View>
        <View>
          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={() => showModal(true)}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showModal(false)}>
            <Image source={require('./assets/login.png')} style={styles.loginImage}></Image>
            </TouchableOpacity>
          </View>
        
        </View>

      <Modal
      transparent={true}
      visible={loginModalVisible}
      onRequestClose={hideModal}
      >

      <View style={styles.centeredView}>
        <Animated.View
          style={[
            styles.modalView,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={styles.buttonClose}>
            <TouchableOpacity onPress={hideModal}>
              <Image source={require('./assets/closeButton.png')} style={styles.closeImage} ></Image> 
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.modalText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder='Enter Email'
            placeholderTextColor={"#fff"}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder='Enter Password'
            placeholderTextColor={"#fff"}
          />
          
         <TouchableOpacity
            style={[styles.button, styles.buttonLogin]}
            onPress={handleAuth}
          >
            <Text style={styles.textStyle}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>


          
          
          <TouchableOpacity onPress={toggleSignUp}>
            <Text style={styles.notRegistered}>{isSignUp ? 'If registered? Log in here. ' : 'Not registered? Sign up here.'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>

  </View>
  </ImageBackground>
  )
}

export default AuthPage;