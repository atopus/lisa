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

  static navigationOptions = ({ navigation }) => ({
    title: 'Liska',
    headerRight : (
      <TouchableNativeFeedback
        onPress={navigation.getParam('createDimension') }
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 0 }} 
      >
        <FAIcon
          
          name='plus'
          color='white'
          size={20}
          style={{ marginRight: 15 }}
        />
      </TouchableNativeFeedback>
    )
  })

  componentDidMount() {
    this.props.navigation.setParams({ 'createDimension' : this._createDimension})
  }

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
    this.props.navigation.navigate('CreateDimension')
  }

  _renderHeader = () => {
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

  /**
   * This projet use a custom forked version of react-native-sortable-list.
   * 
   * onChangeOrder is called each time a row is swapped with another one, while 
   * dragging.
   * This triggers the rerendering of the whole list, and the sorting process 
   * by the user is interrupted.
   * Another solution would be to wait for the end of the dragging operation, 
   * and use the onReleaseRow callback.
   * In order to persist the order (for instance in a Redux store), the 
   * callback thus needs to get the new list order.
   * 
   * @see PR https://github.com/gitim/react-native-sortable-list/pull/117
   */
  _onReleaseRow = (key, newOrder) => {
    this._onChangeOrder(newOrder)
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
          onReleaseRow={this._onReleaseRow}
        />
      </View>
    )
  }

  _renderBody() {
    return (
      <View style={ Styles.body }>
        {this._renderList()}
      </View>
    )
  }

  render() {

    return (
      <View style={Styles.container}>
        {this._renderHeader()}
        {this._renderBody()}
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