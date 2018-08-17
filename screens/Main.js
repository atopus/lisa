import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import SortableList from 'react-native-sortable-list'

import SliderComponent from './Slider'
import Styles, * as StyleVariables from '../Styles'
import {
  setDate
} from '../actions/main'
import {
  sortDimensions
} from '../actions/dimensions'
import {
  getDate,
  getDimensionIds,
  getDimensionOrder
} from '../reducers'

import moment from 'moment/min/moment-with-locales'
moment.locale('fr')

const mapStateToProps = state => ({
  date : getDate(state),
  data: getDimensionIds(state),
  order: getDimensionOrder(state)
})

const mapDispatchToProps = {
  setDate : setDate,
  sortDimensions
};

class Main extends React.PureComponent {

  static navigationOptions = {
    title: 'Liska',
    headerStyle : {
      backgroundColor: StyleVariables.PRIMARY.neutral
    },
    headerTintColor : '#fff',
  };

  /**
   * @see https://gist.github.com/mrzmyr/9ac94ca4622c1602a2a3
   */
  _resetDate = () => {
    const time = new Date().getTime()
	  const delta = time - this.lastPress

	  const DOUBLE_PRESS_DELAY = 400;
	  if (delta < DOUBLE_PRESS_DELAY) {
		  this.props.setDate( moment().format('YYYYMMDD') )
	  }
	  this.lastPress = time
  }

  _previousDate = () => {
    const newDate = moment(this.props.date, 'YYYYMMDD').subtract(1, 'days')
    this.props.setDate(newDate.format('YYYYMMDD'))
  }

  _nextDate = () => {
    const newDate = moment(this.props.date, 'YYYYMMDD').add(1, 'days')
    this.props.setDate(newDate.format('YYYYMMDD'))
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
          <FAIcon.Button 
            size={20}
            style={ Styles.buttonIcon } 
            backgroundColor={StyleVariables.lightgrey}
            name="chevron-left"
          />
        </TouchableNativeFeedback>
        
        <TouchableNativeFeedback
          onPress={this._resetDate}
        >
          <Text style={ Styles.h1 }>
            {moment(this.props.date, 'YYYYMMDD').format('Do MMMM YYYY')}
          </Text>
        </TouchableNativeFeedback>
      
      <TouchableNativeFeedback
        onPress={this._nextDate}
        hitSlop={{top: 10, bottom: 10, left: 0, right: 20}} 
        >
          <FAIcon.Button 
            size={20}
            style={ Styles.buttonIcon }
            backgroundColor={StyleVariables.lightgrey}
            name="chevron-right"
            onPress={this._nextDate}
          />
        </TouchableNativeFeedback>
      </View>
    )
  }

  _renderRow = ({ key, data, active }) => (
    <SliderComponent
      uid={key}
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

  _onChangeOrder = newOrder => {
    this.props.sortDimensions(newOrder)
  }

  _renderList() {
    return (
      <View style={Styles.list}>
        <SortableList
          contentContainerStyle={Styles.contentContainer}
          data={this.props.data}
          order={this.props.order}
          renderRow={this._renderRow}
          onPressRow={this._navToDim}
          onChangeOrder={this._onChangeOrder}
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
  data: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)