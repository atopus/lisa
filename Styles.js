import { StyleSheet } from 'react-native';

export const primary = 'orange'
export const secondary = ''
export const complement1 = ''
export const complement2 = ''

export const danger = '#A10800'   // red
export const warning = 'orange'  // orange
export const info = '#FFE700'    // yellow 
export const success = '#D5F800' // ligth green

export const lightgrey = 'lightgrey'

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
  }
});
