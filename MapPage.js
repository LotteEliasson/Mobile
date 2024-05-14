import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, getDocs, addDoc, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import { app, database } from './firebaseTest';

import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location'
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const MapPage = ({navigation, route}) => {

  auth = getAuth(app);

  const userId = route.params?.userId;
  const userEmail = route.params?.userEmail;
  console.log("User Email: ", userEmail);

  // Henter documents fra firebase, laver et object af hvert doc og tilføjer id som property.
  const data = values?.docs.map((doc) => ({...doc.data(), id:doc.id}))
  const [values, loading, error] = useCollection(collection(database, userId));
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [markers, setMarkers]= useState([]);


  const [region, setRegion] = useState({
    latitude:55,
    longitude:12,
    latitude: 20,
    longitude: 20
  })
  
  const mapView = useRef(null)
  const locationSubscription = useRef(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try{
      const querySnapshot = await getDocs(collection(database, userId));
      const fetchedMarkers = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const coordinate = data.coordinate || {};
        
        return {
          ...data,
          id: doc.id, 
          key: doc.id, 
          coordinate: {
            
            latitude: coordinate.latitude || 0, 
            longitude: coordinate.longitude || 0,
          },
          
        };
      });
      console.log(fetchedMarkers);
      setMarkers(fetchedMarkers);
    } catch(err){
      console.error("err fetching markers", err);
    }
    };
  
    fetchMarkers();
  }, []);


  useEffect (() =>{
    async function startListening(){
      let { status } = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted'){
        alert("ingen adgang til lokation")
        return
      }
      locationSubscription.current = await Location.watchPositionAsync({
        distanceInterval: 100,
        accuracy: Location.Accuracy.High

      }, (location) => {
        const newRegion = {
          latitude:location.coords.latitude,
          longitude:location.coords.longitude,
          latitudeDelta: 20,
          longitudeDelta: 20
        }
        setRegion(newRegion)
        if(mapView.current){
          mapView.current.animateToRegion(newRegion)
        }
      })
    }
    startListening()
    return ()=> {
      if(locationSubscription.current){
        locationSubscription.current.remove()
      }
    }
  }, [])


  async function addMarker(data){
    const {latitude, longitude} = data.nativeEvent.coordinate

    const markerId = uuidv4();

    const newMarker = {
      coordinate: {latitude, longitude},
      key: markerId,
      title: "hello",
    }
    setMarkers([...markers, newMarker])
    try {
      await setDoc(doc(database, userId, markerId), newMarker);
      console.log("Document written with ID: ", markerId);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

  
  async function activateMarker(markerId){
    setSelectedMarkerId(markerId);

    const markerRef = doc(database, userId, markerId);
    const markerDoc = await getDoc(markerRef);
    if (markerDoc.exists()) {
      const markerData = markerDoc.data();
    } else {
      console.log("No such marker!");
      setImages([]);
    }
  }
  

  async function sign_out(){
    await signOut(auth)
    console.log("Signed out")
    navigation.navigate('AuthPage');
  }

  return (
    <View style={styles.container}>
      <MapView
        style = {styles.map}
        region={region}
        onLongPress={addMarker}
      >
        {markers.map(marker =>(
          <Marker 
          coordinate={{
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
          }}
          key={marker.key}
          title={marker.title}
          onPress={() => {activateMarker(marker.id)}}
          > 
          
          </Marker>
        ))}


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