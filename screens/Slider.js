import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, Slider, Alert, Animated, Platform, Easing } from 'react-native'
import Styles, * as StyleVariables from '../Styles'
import * as Dimension from '../models/Dimension'

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

  constructor(props) {
    super(props)

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.02],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.01],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

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

  _getNumericLabel(value, unit) {
    return `${value} ${unit}`
  }

  render() {

    const d = this.props.dimension
    const value = this.props.value

    // set min, max, valueLabel, sliderValue according to variable type
    let min = 0 
    let max = 0
    let valueLabel = 'No label applicable'

    // unQualified
    if(!Dimension.isUnqualified(d)) {
      if(Dimension.isRanking(d)){

        const indices = d.options.map(option => option.index)
        min = Math.min.apply(0, indices)
        max = Math.max.apply(0, indices)
        valueLabel = this._getOptionLabel(value, d.options)

      } else if(Dimension.isNumeric(d)) {

        min = d.min
        max = d.max
        valueLabel = this._getNumericLabel(value, d.unit)
        
      } else {
        throw new Error("unknown dimension type "+d.label)
      }
    }

    const color = this._getColor(value, d.thresholds);
    const sliderValue = value !== false ? value : 0
    const label = (value !== false && value !== undefined && value !== null) ? valueLabel : '\u2754'

    const disabled = !Dimension.isEnabled(d)

    return (
      <Animated.View style={[ 
        Styles.item, Styles.row, this._style,
        { borderLeftColor: color }
      ]}>
        <View style={{ flex: 1, }}>
          <Text style={ Styles.h2 }>{d.label} :</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={ [ Styles.p, { minHeight: 35 }] }>
            {label}
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
      </Animated.View>
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