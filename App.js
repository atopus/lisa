import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider, FlatList } from 'react-native';
import { getData, getDimensions, setValue, getValues } from './Provider';
import moment from 'moment';


class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: props.value || 0,
      renderOptions: this.props.renderOptions || { step : 1, min : 0, max : 10 }
    }
  }

  componentDidMount() {
    getValues(this.props.id)
      .then(value => value && this.setState({ value }) )
      .catch(error => { throw error });
  }

  onValueChange(value) {
    setValue(this.props.id, value);
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
    const valueLabel = scale ? scale[value] : ''+value;
    const color = this.getColor(value);

    return (
      <View style={[ styles.item, { backgroundColor: color } ]}>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 24 }}>{label}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 16 }}>
            {valueLabel} {unit && ' '+unit}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
        
          <Slider 
            style={{ flex: 1, width:'100%' }} 
            minimumValue={sliderMin} 
            maximumValue={sliderMax} 
            value={value} onValueChange={value => this.onValueChange(value)} 
            step={step}
            thumbTintColor='black'
            minimumTrackTintColor='white'
          />
        </View>
      </View>
    )
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    const dimensions = getDimensions().map(d => ({ key: d }));
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
        <View style={styles.header}>
          <View>
            {this.state.fetched && <Text>Connected to Internet</Text>}
          </View>
          <View style={ styles.header }>
            <Text style={{ fontSize: 40 }}>{moment().format('Do MMMM YYYY')}</Text>
          </View>
        </View>
        <View style={styles.list}>
          <ScrollView>
          <FlatList 
            data={this.state.dimensions} 
            renderItem={({item}) => {
              return (<SliderComponent
                id={item.key}
                value={this.state[item.key]}
              />) 
            }}/>
          </ScrollView>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 4
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
