import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider, FlatList, Alert, Button } from 'react-native';
import { getData, getDimensions, setValue, getValues, clearAll } from '../services/Provider';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment/min/moment-with-locales';
import styles from '../Styles';

moment.locale('fr');

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
    getValues(this.props.id, this.props.date)
      .then(value => {
        value && this.setState({ value }) 
      })
      .catch(error => { throw error });
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

    this.setState({ value });

    return setValue(this.props.id, this.props.date, value)
      .then(result => {
        !result && alert();
      })
      .catch(error => alert(error) );
  }

  getColor(value, thresholds) {

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

  render() {
    const data = getData(this.props.id);
    const value = this.state.value;
    const { label, scale, dataMin, dataMax, unit } = data;
    const { step, min, max } = this.props.renderOptions || { step : 1, min :0, max : 10 };
    const sliderMin = dataMin || scale && Math.min.apply(1, Object.keys(scale)) || min || 0;
    const sliderMax = dataMax || scale && Math.max.apply(0, Object.keys(scale)) || max ;
    const valueLabel = scale ? scale[value] : ''+value;
    const color = this.getColor(value, data.thresholds);

    return (
      <View style={[ styles.item, { borderLeftColor: color } ]}>
        <View style={{ flex: 1, paddingHorizontal : 10 }}>
          <Text style={{ flex: 1, fontSize: 24 }}>{label} :</Text>
        </View>
        <View style={{ flex: 2, paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, minHeight: 35, color: 'grey' }}>
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
            thumbTintColor={color}
            minimumTrackTintColor={color}
          />
        </View>
      </View>
    )
  }
}

export default SliderComponent