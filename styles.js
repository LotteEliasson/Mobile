import { StyleSheet } from "react-native";

export default StyleSheet.create({
  authContainer:{
    flex: 1,
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'strech',
    // backgroundColor: '#252625',
  },
  topContainer: {
    // Adjust this container to hold text or any other content at the top
    flex: 0.8, // Adjust flex to control how much space this takes, e.g., `flex: 1`
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  loginContainer: {
    flex: 0.2,
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'flex-end'
   
  },
  loginImage:  {
    width: '100%', 
    height: 48, // Set a fixed height or adjust as needed
    resizeMode: 'contain', // Make sure the image fits within the container dimensions
    borderRadius: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    
    borderColor: '#fff',
    
  },

  welcomeText:{
    color: '#000'
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
  buttonLogin: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonClose: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: '#afc9c8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    minWidth: 200,
    borderBottomWidth: 2,
    borderColor: '#fff',
    paddingTop: 10,
  },
  notRegistered:{
    color: '#fff',
    paddingTop: 30,
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationColor: '#fff'

  }

})