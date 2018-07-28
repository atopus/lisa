import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider, FlatList } from 'react-native';
import { getData, getDimensions, MOTIVATION, PREPARATION, METHOD } from './Provider';


class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: props.value || 0,
      renderOptions: this.props.renderOptions || { step : 1, min :0, max : 10 }
    }
  }

  onValueChange(value) {
    this.setState({ value })
  }

  getColor(value) {
    if(value < 2.5) return '#A10800';
      else if(value < 4) return 'orange';
      else if(value < 7) return '#FFE700';
      else return '#D5F800'; 
  }

  render() {
    const data = getData(this.props.id);
    const value = this.state.value;
    const { label, scale, dataMin, dataMax, unit } = data;
    const { step, min, max } = this.props.renderOptions || { step : 1, min :0, max : 10 };
    const sliderMin = dataMin || min || 0;
    const sliderMax = dataMax || max || scale && Object.keys(scale).length ;
    const valueLabel = scale ? scale[parseInt(value)] : ''+value;
    const color = this.getColor(value);

    return (
      <View style={[ styles.container, { backgroundColor: color } ]}>
        <Text style={{ fontSize: 24 }}>{label} : {valueLabel} {unit && ' '+unit}</Text>
        <Slider 
          style={{ width:'100%' }} 
          minimumValue={sliderMin} 
          maximumValue={sliderMax} 
          value={value} onValueChange={value => this.onValueChange(value)} 
          step={step}
          thumbTintColor='black'
          minimumTrackTintColor='white'
        />
      </View>
    )
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    const dimensions = getDimensions().map(d => ({ key: d }));
    console.log(dimensions)
    const values = {}
    dimensions.forEach( k => values[k] = 0);
    this.state = {
      "fetched" : false,
      dimensions : dimensions,
      ...values
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
        {this.state.fetched && <Text>Connected to Internet</Text>}
        <FlatList 
          data={this.state.dimensions} 
          renderItem={({item}) => {
            return (<SliderComponent
              id={item.key}
              value={this.state[item.key]}
            />) 
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
    padding: 10
  }
});
