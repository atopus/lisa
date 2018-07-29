import React from 'react';
import { StyleSheet, Text, View, ScrollView, Slider, FlatList, Alert, Button } from 'react-native';
import { getData, getDimensions, setValue, getValues, clearAll } from './Provider';
import { Ionicons } from '@expo/vector-icons';
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
      date: moment().format('YYYYMMDD'),
      dimensions : dimensions,
      ...values
    }
  }

  componentDidMount() {

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
              <Ionicons name='ios-disc' size={25} color='green' /> :
              <Ionicons name='md-disc' size={25} color='red' />
            }

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
