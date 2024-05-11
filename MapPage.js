import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const MapPage = (navigate, route) => {



  return (
    <View>
      <MapView
        style = {styles.map}
      >
      </MapView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})

export default MapPage;