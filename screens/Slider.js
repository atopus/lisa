import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Slider, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import Styles, * as StyleVariables from '../Styles';

import {
  getDate,
  getValue,
  getDimension
} from '../reducers';
import {
  saveValue
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
  setValue: saveValue
}

class SliderComponent extends React.Component {

  onValueChange(value) {
    return this.props.setValue(this.props.dimension.uid, this.props.date, value)
  }

  _getColor(value, thresholds) {

    if(value === false || value === undefined || value === null) 
      return 'lightgrey';

    const COLORS = [
      StyleVariables.danger, // red.
      StyleVariables.warning,  // orange
      StyleVariables.info, // yellow
      StyleVariables.success  // light green
    ]

    const thr = thresholds || [3, 4, 7];

    let i = thr.findIndex(v => v > value);
    i = i > -1 ? i : COLORS.length - 1;
    return COLORS[i];
  }

  _getOptionLabel(value, options) {
    if(value !== false && value !== undefined && value !== null) {
      
      const option = options.find(option => option.index === value)
      
      if(!option) {
        Alert.alert(
          "Internal Error", 
          `Sorry, could not find value ${value} for dimension ${this.props.dimension.uid}. Therefore it has been skipped. I may be due to a corrupted data. Please notify the author of this app if this problem persits.`, 
          [{ 'text' : 'Ok' }]
        )
      } else {
        return option.text
      }
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
        underlayColor={StyleVariables.COMPLEMENT2.lighter}
      >
        <View style={[ Styles.item, { borderLeftColor: color } ]}>
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

const styles = StyleSheet.create({
  container : {

  },
  slider : {
    flex: 1,
    width: '100%'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderComponent)