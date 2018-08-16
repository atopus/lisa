import { StyleSheet, Platform } from 'react-native';

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

export const lightgrey = 'lightgrey'
export const grey = 'grey'

export const primary = PRIMARY.neutral

export const danger = COMPLEMENT1.dark
export const warning = PRIMARY.light
export const info = '#FFE700'// COMPLEMENT2.neutral
// export const danger = '#A10800'   // red
// export const warning = 'orange'  // orange
// export const info = '#FFE700'    // yellow 
export const success = '#D5F800' // ligth green

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
    borderLeftWidth : 6,
    paddingLeft: 10,
    paddingBottom: 3,
    paddingHorizontal: 3,
    backgroundColor: 'white',

    ...Platform.select({
      ios: {
        width: window.width - 5 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 5 * 2,
        elevation: 0,
        marginHorizontal: 5,
      },
    })
  },
  slider: {
    flex: 1,
    padding: 10
  },
  scrollList : {
    paddingHorizontal: 15
  },
  list: {
    flex: 5
  },
  header: {
    flex: 1,
    alignItems : 'center', 
    justifyContent : 'space-around',
    flexDirection: 'row'
  },
  footer : {
    flex: 1,
    alignItems: 'center'
  },
  textInput : {
    backgroundColor:'white', 
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    color: 'grey'
  },
  h1 : {
    fontSize: 40
  },
  h2 : {
    fontSize: 24
  },
  h3 : {
    fontSize: 18
  },
  p : {
    color: grey,
    fontSize: 16
  },
  separator : {
    backgroundColor: '#eee',
    height: 1
  },
  buttonIcon : {
    padding: 5 // Use padding to enlarge touchable area.
  }
});
