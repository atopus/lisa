import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import SliderComponent from './Slider';
import Styles, * as StyleVariables from '../Styles';
import {
  setDate
} from '../actions/main.js';
import {
  getStorageAvailability,
  getNetworkAvailability,
  getDate,
  getDimensions
} from '../reducers';
import {
  checkNetworkAvaibility,
  checkStorageAvailability
} from '../actions/app';

import moment from 'moment/min/moment-with-locales';
moment.locale('fr');

const mapStateToProps = state => ({
  storage : getStorageAvailability(state),
  internet : getNetworkAvailability(state),
  date : getDate(state),
  dimensions: getDimensions(state).map(d => ({ key: d }))
});

const mapDispatchToProps = {
  setDate : setDate,
  checkNetworkAvaibility : checkNetworkAvaibility,
  checkStorageAvailability : checkStorageAvailability
};

class Main extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle : {
      backgroundColor: StyleVariables.PRIMARY.neutral
    },
    headerTintColor : '#fff',
  };

  componentDidMount() {
    // Internet & localStorage availability is checked on mount because Android
    // v7 against which it is regularly tested often bugs aften a couple of 
    // expo reloadings.
    this.props.checkNetworkAvaibility();
    this.props.checkStorageAvailability();
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
    const newDate = moment(this.props.date, 'YYYYMMDD').subtract(1, 'days');
    this.props.setDate(newDate.format('YYYYMMDD'));
  }

  nextDate() {
    const newDate = moment(this.props.date, 'YYYYMMDD').add(1, 'days');
    this.props.setDate(newDate.format('YYYYMMDD'));
  }

  renderControl() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.props.internet ? 
          <Ionicons name='ios-wifi' size={25} color={StyleVariables.success} /> :
          <Ionicons name='ios-wifi' size={25} color={StyleVariables.warning} />
        }
        {this.props.storage ? 
          <Ionicons name='md-disc' size={25} color={StyleVariables.success} /> :
          <Ionicons name='md-disc' size={25} color={StyleVariables.danger} />
        }
      </View>
    )
  }

  renderHeaderDate() {
    return (
      <View style={ Styles.header }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <FAIcon.Button size={12} backgroundColor='#ddd'
              name="chevron-left"
              onPress={() => this.previousDate()}
            ></FAIcon.Button>
          </View>  
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={ Styles.h1 }>
              {moment(this.props.date, 'YYYYMMDD').format('Do MMMM YYYY')}
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
    )
  }

  renderHeader() {
    return (
      <View style={Styles.header}>
        {this.renderControl()}
        {this.renderHeaderDate()}
      </View>
    )
  }

  renderList() {
    return (
      <View style={Styles.list}>
        <ScrollView>
          <FlatList 
            data={this.props.dimensions}
            renderItem={({item}) => {
              return (
                <SliderComponent
                  id={item.key}
                  date={this.props.date}
              />) 
            }}/>
        </ScrollView>
      </View>
    )
  }

  render() {

    return (
      <View style={Styles.container}>
        {this.renderHeader()}
        {this.renderList()}
      </View>
    )}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)