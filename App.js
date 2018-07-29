import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider, FlatList, Alert, Button } from 'react-native';
import { getData, getDimensions, setValue, getValues, clearAll } from './Provider';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment/min/moment-with-locales';

moment.locale('fr')

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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    const dimensions = getDimensions().map(d => ({ key: d }));
    const values = {}
    dimensions.forEach( k => values[k] = 0);
    this.state = {
      storage: false,
      internet : false,
      date: props.date || moment().format('YYYYMMDD'),
      dimensions : dimensions,
      ...values
    }
  }

  componentDidMount() {
    // Internet & localStorage availability is checked on mount because Android
    // v7 against which it is regularly tested often bugs aften a couple of 
    // expo reloadings.

    fetch('http://google.com', { method: 'GET' })
      .then(result => this.setState({ internet: true }))
      .catch(error => { throw new Error(error) })
    setValue("storageTest", moment().format('YYYYMMDD'), true)
      .then(result => this.setState({ storage: result }))
      .catch(error => this.setState({ storage: false }))
  }

  clearData() {

    const alert = (error) => {
      Alert.alert(
        'Oups !',
        "Une erreur s'est produite lors de l'enregistrement"+error && ' : '+error,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      );
    };
    
    return clearAll()
      .then(result => result ?
          Alert.alert(
            'Ok !',
            "Les données ont bien été effacées",
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            { cancelable: false }
          ) : 
          alert()
        )
      .catch(error => alert(error));
  }

  resetDate() {
    this.setState({ date : moment().format('YYYYMMDD') });
  }

  previousDate() {
    const newDate = moment(this.state.date, 'YYYYMMDD').subtract(1, 'days');
    this.setState({ date : newDate.format('YYYYMMDD') });
  }

  nextDate() {
    const newDate = moment(this.state.date, 'YYYYMMDD').add(1, 'days');
    this.setState({ date : newDate.format('YYYYMMDD') });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            {this.state.internet ? 
              <Ionicons name='ios-wifi' size={25} color='green' /> :
              <Ionicons name='ios-wifi' size={25} color='orange' />
            }
            {this.state.storage ? 
              <Ionicons name='md-disc' size={25} color='green' /> :
              <Ionicons name='md-disc' size={25} color='red' />
            }

          </View>
          <View style={ styles.header }>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <FAIcon.Button size={12} backgroundColor='#ddd'
                  name="chevron-left"
                  onPress={() => this.previousDate()}
                ></FAIcon.Button>
              </View>  
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 40 }}>
                  {moment(this.state.date, 'YYYYMMDD').format('Do MMMM YYYY')}
                </Text>
              </View>
              <View>
                <FAIcon.Button size={12} backgroundColor='#ddd'
                  name="chevron-right"
                  onPress={() => this.nextDate()}
                ></FAIcon.Button>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.list}>
          <ScrollView>
          <FlatList 
            data={this.state.dimensions} 
            renderItem={({item}) => {
              return (<SliderComponent
                id={item.key}
                date={this.state.date}
                value={this.state[item.key]}
              />) 
            }}/>
          </ScrollView>
        </View>
        {/* <View style={styles.footer}> */}
          {/* <Button onPress={() => this.clearData()} title="Supprimer les données" /> */}
        {/* </View> */}
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
  }
});
