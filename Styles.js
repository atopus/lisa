import { StyleSheet } from 'react-native';

// Color scheme
// http://paletton.com/#uid=50B0u0kp5F+eGQPkjL1uKBG-5rp

export const PRIMARY = {
  neutral : '#FF9F37', // Fox color
  light : '#FFB15D',
  lighter: '#FFC78A',
  dark : '#FF8A0A',
  darker : '#DA7200'
}

export const SECONDARY = ''
export const COMPLEMENT1 = {
  neutral : '#FF5A37',
  light: '#FF795D',
  lighter : '#FF9E8A',
  dark : '#FF350A',
  darker : '#DA2600'
}
export const COMPLEMENT2 = {
  neutral : '#FFC537',
  light : '#FFD05D',
  lighter : '#FFDD8A',
  dark: '#FFBB0A',
  darker: 'DA9B00'
}

export const primary = PRIMARY.neutral

export const danger = COMPLEMENT1.dark
export const warning = PRIMARY.light
export const info = COMPLEMENT2.neutral
// export const danger = '#A10800'   // red
// export const warning = 'orange'  // orange
// export const info = '#FFE700'    // yellow 
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
  },
  h1 : {
    fontSize: 40
  }
});
