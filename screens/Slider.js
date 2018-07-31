import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Slider, Alert, TouchableHighlight } from 'react-native';
import styles from '../Styles';

import {
  getDate,
  getValue,
  getDimension
} from '../reducers';
import {
  saveValue,
  loadValues
} from '../actions/dimensions';

import moment from 'moment/min/moment-with-locales';
moment.locale('fr');

const mapStateToProps = (state, props) => {
  return {
    dimension : getDimension(state, props.uid),
    value : getValue(state, props.uid, getDate(state)),
    date: props.date
  }
};

const mapDispatchToProps = {
  setValue: saveValue,
  loadValues: loadValues
}

class SliderComponent extends React.Component {

  componentDidMount() {
    if(!this.props.value) {
      this.props.loadValues(this.props.dimension.uid);
    }
  }

  onValueChange(value) {

    const alert = (error) => {
      Alert.alert(
        'Oups !',
        "Une erreur s'est produite lors de l'enregistrement"+error && ' : '+error,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      );
    };
    
    return this.props.setValue(this.props.dimension.uid, this.props.date, value)
      .then(result => {
        !result && alert();
      })
      .catch(error => alert(error) );
  }

  _getColor(value, thresholds) {

    if(!value) return 'lightgrey';

    const COLORS = [
      '#A10800', // red.
      'orange',  // orange
      '#FFE700', // yellow
      '#D5F800'  // light green
    ]

    const thr = thresholds || [3, 4, 7];

    let i = thr.findIndex(v => v > value);
    i = i > -1 ? i : COLORS.length - 1;
    return COLORS[i];
  }

  _getOptionLabel(value, options) {
    if(value) {
      
      const option = options.find(option => option.index === value)
      
      if(!option) {
        throw new Error(`Unable to find option for dimension ${this.props.dimension.uid} and value ${value}`)
      }
      
      return option.text

    } else return '--'
  }

  render() {

    const indices = this.props.dimension.options.map(option => option.index)
    const min = Math.min.apply(0, indices)
    const max = Math.max.apply(0, indices)
    const valueLabel = this._getOptionLabel(this.props.value, this.props.dimension.options)

    color = this._getColor(this.props.value, this.props.dimension.thresholds);
    const sliderValue = this.props.value !== false ? this.props.value : 0

    return (
      <TouchableHighlight 
        onPress={() => this.props.navigation.navigate('Dimension', {
          dimensionId: this.props.dimension.uid
        })}
        underlayColor='yellow'
      >
        <View style={[ styles.item, { borderLeftColor: color } ]}>
          <View style={{ flex: 1, paddingHorizontal : 10 }}>
            <Text style={{ flex: 1, fontSize: 24 }}>{this.props.dimension.label} :</Text>
          </View>
          <View style={{ flex: 2, paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontSize: 16, minHeight: 35, color: 'grey' }}>
              {valueLabel}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
          
            <Slider 
              style={{ flex: 1, width:'100%' }} 
              minimumValue={min} 
              maximumValue={max} 
              value={sliderValue} 
              onValueChange={value => this.onValueChange(value)} 
              step={1}
              thumbTintColor={color}
              minimumTrackTintColor={color}
            />

          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderComponent)