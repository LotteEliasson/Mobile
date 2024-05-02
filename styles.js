import { StyleSheet } from "react-native";

export default StyleSheet.create({
  authContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#252625',
  },
// Modal
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
  
},
modalView: {
  margin: 20,
  backgroundColor: '#afc9c8',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  width: '80%',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
buttonOpen: {
  backgroundColor: '#afc9c8',
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonClose: {
 marginTop:50,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
  color: 'white',
},



})