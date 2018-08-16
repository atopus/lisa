import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import SortableList from 'react-native-sortable-list'

const window = Dimensions.get('window');

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
        <TouchableNativeFeedback
          onPress={this._previousDate}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 0}} 
        >
          <FAIcon size={20}
            style={ Styles.buttonIcon } 
            color={StyleVariables.lightgrey}
            name="chevron-left"
          />
        </TouchableNativeFeedback>
        
        <Text style={ Styles.h1 }>
          {moment(this.props.date, 'YYYYMMDD').format('Do MMMM YYYY')}
        </Text>
      
      <TouchableNativeFeedback
        onPress={this._nextDate}
        hitSlop={{top: 10, bottom: 10, left: 0, right: 20}} 
        >
          <FAIcon size={20}
            style={ Styles.buttonIcon }
            color={StyleVariables.lightgrey}
            name="chevron-right"
            onPress={this._nextDate}
          />
        </TouchableNativeFeedback>
      </View>
    )
  }

  _renderRow = ({ key, data, active }) => (
    <SliderComponent
      uid={data.uid}
      key={key}
      date={this.props.date}
      navigation={this.props.navigation}
      active={active}
    />
  )

  _navToDim = key => {    
    this.props.navigation.navigate('Dimension', {
      dimensionId: key 
    })
  }

  _renderList() {
    return (
      <View style={Styles.list}>
        <SortableList
          contentContainerStyle={Styles.contentContainer}
          data={this.props.dimensions}
          renderRow={this._renderRow}
          onPressRow={this._navToDim}
        />
        <View style={{ alignItems : 'center', paddingBottom: 5 }}>
          <FAIcon.Button
            name='plus'
            backgroundColor={StyleVariables.primary}
            onPress={this._createDimension}>
              Create dimension
            </FAIcon.Button>
        </View>
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