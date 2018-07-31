import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Button, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import SliderComponent from './Slider';
import styles from '../Styles';
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
import {
  loadDimensions
} from '../actions/dimensions';

import moment from 'moment/min/moment-with-locales';
moment.locale('fr');

const mapStateToProps = state => ({
  storage : getStorageAvailability(state),
  internet : getNetworkAvailability(state),
  date : getDate(state),
  dimensions: getDimensions(state).map(d => ({ ...d, key: d.uid }))
});

const mapDispatchToProps = {
  setDate : setDate,
  loadDimensions: loadDimensions,
  checkNetworkAvaibility : checkNetworkAvaibility,
  checkStorageAvailability : checkStorageAvailability
};

class Main extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle : {
      backgroundColor: 'orange'
    },
    headerTintColor : '#fff',
  };

  componentDidMount() {
    // Internet & localStorage availability is checked on mount because Android
    // v7 against which it is regularly tested often bugs aften a couple of 
    // expo reloadings.
    this.props.loadDimensions();
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
          <Ionicons name='ios-wifi' size={25} color='green' /> :
          <Ionicons name='ios-wifi' size={25} color='orange' />
        }
        {this.props.storage ? 
          <Ionicons name='md-disc' size={25} color='green' /> :
          <Ionicons name='md-disc' size={25} color='red' />
        }
      </View>
    )
  }

  renderHeaderDate() {
    return (
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
      <View style={styles.header}>
        {this.renderControl()}
        {this.renderHeaderDate()}
      </View>
    )
  }

  renderList() {
    return (
      <View style={styles.list}>
        <ScrollView>
          <FlatList 
            data={this.props.dimensions}
            renderItem={({item}) => {
              return (
                <SliderComponent
                  uid={item.uid}
                  date={this.props.date}
                  navigation={this.props.navigation}
              />) 
            }}/>
        </ScrollView>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderList()}
      </View>
    )}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)