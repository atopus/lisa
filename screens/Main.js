import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, FlatList, Button } from 'react-native';
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

const mapStateToProps = state => {
  let dimensions = getDimensions(state)
  dimensions = dimensions && dimensions.length > 0 ?
    dimensions.map(d => ({ ...d, key: d.uid })) : []
  return {
    storage : getStorageAvailability(state),
    internet : getNetworkAvailability(state),
    date : getDate(state),
    dimensions
  }
}

const mapDispatchToProps = {
  setDate : setDate,
  checkNetworkAvaibility : checkNetworkAvaibility,
  checkStorageAvailability : checkStorageAvailability
};

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      new: false
    }
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle : {
      backgroundColor: StyleVariables.PRIMARY.neutral
    },
    headerTintColor : '#fff',
  };


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

  renderHeaderDate() {
    return (
      <View style={ [ Styles.header, { paddingTop: 15  } ] }>
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
                  uid={item.uid}
                  date={this.props.date}
                  navigation={this.props.navigation}
              />) 
          }}/>
          <View style={{ alignItems : 'center', width: '50%'}}>
            <Button 
              title='+' 
              onPress={() => this.props.navigation.navigate('Dimension', {
                new: true
              })} />
          </View>
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