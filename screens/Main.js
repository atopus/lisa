import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Text, View, ScrollView, FlatList, Button } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import SliderComponent from './Slider';
import Styles, * as StyleVariables from '../Styles';
import {
  setDate
} from '../actions/main.js';
import {
  getDate,
  getDimensions
} from '../reducers';

import moment from 'moment/min/moment-with-locales';
moment.locale('fr');

const mapStateToProps = state => {
  let dimensions = getDimensions(state)
  dimensions = dimensions && dimensions.length > 0 ?
    dimensions.map(d => ({ ...d, key: d.uid })) : []
  return {
    date : getDate(state),
    dimensions
  }
}

const mapDispatchToProps = {
  setDate : setDate
};

class Main extends React.PureComponent {

  static navigationOptions = {
    title: 'Liska',
    headerStyle : {
      backgroundColor: StyleVariables.PRIMARY.neutral
    },
    headerTintColor : '#fff',
  };

  _resetDate = () => {
    this.setState({ date : moment().format('YYYYMMDD') });
  }

  _previousDate = () => {
    const newDate = moment(this.props.date, 'YYYYMMDD').subtract(1, 'days');
    this.props.setDate(newDate.format('YYYYMMDD'));
  }

  _nextDate = () => {
    const newDate = moment(this.props.date, 'YYYYMMDD').add(1, 'days');
    this.props.setDate(newDate.format('YYYYMMDD'));
  }

  _createDimension = () => {
    this.props.navigation.navigate('Dimension', { new: true })
  }

  _renderHeader() {
    return (
      <View style={Styles.header}>
        <FAIcon size={20}
          style={ Styles.buttonIcon } 
          color={StyleVariables.lightgrey}
          name="chevron-left"
          onPress={this._previousDate}
        />
        
        <Text style={ Styles.h1 }>
          {moment(this.props.date, 'YYYYMMDD').format('Do MMMM YYYY')}
        </Text>
      
        <FAIcon size={20}
          style={ Styles.buttonIcon }
          color={StyleVariables.lightgrey}
          name="chevron-right"
          onPress={this._nextDate}
        />
      </View>
    )
  }

  _renderList() {
    return (
      <View style={Styles.list}>
        <ScrollView>
          <FlatList 
            ItemSeparatorComponent={({highlighted}) => (
                <View style={Styles.separator} />
            )}
            data={this.props.dimensions}
            renderItem={({item}) => (
                <SliderComponent
                  uid={item.uid}
                  date={this.props.date}
                  navigation={this.props.navigation}
              />) 
          }/>
          <View style={{ alignItems : 'center', paddingBottom: 5 }}>
            <FAIcon.Button
              name='plus'
              backgroundColor={StyleVariables.primary}
              onPress={this._createDimension}>
                Create dimension
              </FAIcon.Button>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {

    return (
      <View style={Styles.container}>
        {this._renderHeader()}
        {this._renderList()}
      </View>
    )}
}

Main.propTypes = {
  date : PropTypes.string.isRequired,
  dimensions: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)