import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "autonomy": 0,
      "method" : 0,
      "realisation" : 0,
      "concentration": 0,
      "knowledge" : 0,
      "skills" : 0,
      "fetched" : false
    }
  }

  componentDidMount() {
    return fetch('http://google.com', {
      method: 'GET'
    }).then(result => {
      this.setState({ fetched: true })
    })
    .catch(error => { throw new Error(error) })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fetched && <Text>Fetched</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
