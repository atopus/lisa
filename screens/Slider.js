import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Text, View, Slider, TouchableHighlight, Alert } from 'react-native';
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

class SliderComponent extends React.PureComponent {

  _onValueChange(value) {
    return this.props.setValue(this.props.dimension.uid, this.props.date, value)
  }

  _getColor(value, thresholds) {

    if(value === false || value === undefined || value === null) 
      return StyleVariables.lightgrey;

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

    if(options.length < 2) return 'ℹ️ You must set at least 2 options.'

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

  _navigateToDimension = () => {
    this.props.navigation.navigate('Dimension', {
      dimensionId: this.props.dimension.uid
    })
  }

  render() {

    const indices = this.props.dimension.options.map(option => option.index)
    const min = Math.min.apply(0, indices)
    const max = Math.max.apply(0, indices)
    const valueLabel = this._getOptionLabel(this.props.value, this.props.dimension.options)

    color = this._getColor(this.props.value, this.props.dimension.thresholds);
    const sliderValue = this.props.value !== false ? this.props.value : 0

    const disabled = this.props.dimension.options && this.props.dimension.options.length < 2

    return (
      <TouchableHighlight 
        onPress={this._navigateToDimension}
        underlayColor={StyleVariables.COMPLEMENT2.lighter}
      >
        <View style={[ Styles.item, { borderLeftColor: color } ]}>
          <View style={{ flex: 1, }}>
            <Text style={ Styles.h2 }>{this.props.dimension.label} :</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={ [ Styles.p, { minHeight: 35 }] }>
              {valueLabel}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
          
            <Slider  
              minimumValue={min} 
              maximumValue={max} 
              value={sliderValue} 
              onValueChange={value => this._onValueChange(value)} 
              step={1}
              thumbTintColor={color}
              minimumTrackTintColor={color}
              disabled={disabled}
            />

          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

SliderComponent.propTypes = {
  dimension: PropTypes.object.isRequired,
  value: PropTypes.number,
  date: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderComponent)