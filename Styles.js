import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
    padding: 10
  },
  list: {
    flex: 5
  },
  item : {
    borderLeftWidth : 6,
    paddingBottom: 10
  },
  header: {
    flex: 1,
    alignItems : 'center', 
    justifyContent : 'center'
  },
  footer : {
    flex: 1
  },
  textInput : {
    backgroundColor:'white', 
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5
  }
});
