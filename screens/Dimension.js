import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ScrollView, Text, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
import Styles, * as StyleVariables from '../Styles'
import DimensionOption from './DimensionOption'
import { TextInput } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import * as Dim from '../models/Dimension'

import {
  getDimension
} from '../reducers'
import {
  createDimension,
  updateDimension,
  removeDimension
} from '../actions/dimensions'

const mapStateToProps = (state, props) => {
  const uid = props.navigation.state.params.dimensionId
  const dimension = uid ? getDimension(state, uid) : null
  if(dimension) {
    dimension.options = dimension.options ? 
      Object.keys(dimension.options).map(key => ({
        key,
        ...dimension.options[key]
      })) : []
  }

  return {
    uid,
    dimension,
    new : Boolean(props.navigation.state.params.new) || false
  } 
}

const mapDispatchToProps = {
  createDimension,
  updateDimension,
  removeDimension
}

const _exists = v => v !== null && v !== undefined

class Dimension extends React.PureComponent {

  constructor(props) {
    super(props)

    const _d = this.props.dimension

    this.state = {
      label: _d && _d.label || '',
      max:  _d && _exists(_d.max)   ? _d.max : '',
      min:  _d && _exists(_d.min)   ? _d.min : '',
      step: _d && _exists(_d.step)  ? _d.step : '',
      unit: _d && _d.unit || '',
      edit: props.navigation.state.params.new || false,
      isNew: props.navigation.state.params.new || false,
      newOption: false,
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Dimension',
    headerStyle : {
      backgroundColor: StyleVariables.PRIMARY.neutral
    },
    headerTintColor : '#fff'
  })

  _onSubmit = () => {

    if(this.state.isNew) {
      const uid = this.props.createDimension(this.state.label)
      this.props.navigation.navigate('Dimension', { dimensionId: uid })
    } else {
      this.props.updateDimension({ 
        ...this.props.dimension, 
        label:  this.state.label,
      })
    }

    this.setState({ edit: false, isNew : false })
  }

  _onCancel = () => {
    this.setState({ edit: false })
  }

  _edit = () => {
    this.setState({ edit: true })
  }

  _onCreateOption = () => {
    this.setState({ newOption : true })
  }

  _onDeleteConfirm = () => {
    Alert.alert(
      'Are you sure ?', 
      '', 
      [{
          'text' : "Yes !", 
          onPress : () => {
          this.props.removeDimension(this.props.uid)
          this.props.navigation.navigate('Home')
          }
        }, {
          'text' : 'Nope'
        }
      ],
      { cancelable: true }  
    ) 
  }

  _onSubmitNumericForm = () => {

    const min  = _exists(this.state.min) ? parseInt(this.state.min)    : null
    const max  = _exists(this.state.max) ? parseInt(this.state.max)    : null
    const step = this.state.step ? parseInt(this.state.step)  : null
    const unit = this.state.unit

    this.props.updateDimension({ ...this.props.dimension, min, max, step, unit})

    this.props.navigation.navigate('Home')
  }

  _renderHeader() {
    return this.state.edit ? (
      <View style={ Styles.header } >
        <View style={{ width: '80%' }}>
          <TextInput 
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [Styles.textInput, Styles.h1 ] }
            onChangeText={label => this.setState({ label }) }
          >
            {this.state.label}
          </TextInput>
        </View>
        <View style={{ width: '20%', flexDirection: 'row', flex:1, justifyContent: 'space-around' }}>
          <FAIcon
            style={ Styles.buttonIcon }
            size={20}
            name='check'
            color={ StyleVariables.success } 
            onPress={this._onSubmit}
            disabled={!this.state.label || !this.state.label.trim()} 
          />
          {!this.state.isNew && (
            <FAIcon
              style={ Styles.buttonIcon }
              size={20}
              name='ban'
              color={ StyleVariables.warning }
              onPress={this._onCancel}
            />
          )}
        </View>
      </View>
    ) : (
      <TouchableWithoutFeedback
        onPress={this._edit}
      >
        <View style={ Styles.header }>
          <Text style={ Styles.h1 }>{this.state.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderOptionList() {

    const newIndex = 
      this.props.dimension && this.props.dimension.options.length > 0 ?
        Math.max.apply(1, this.props.dimension.options.map(o => parseInt(o.index))) + 1 :
        0

    const options = this.props.dimension ? this.props.dimension.options : []

    return (
      <View style={{ flex: 5 }}>
        <ScrollView style={ Styles.scrollList }>

          {options.length > 0 && (
            <FlatList
              ItemSeparatorComponent={({highlighted}) => (
                    <View style={[Styles.separator, highlighted && {marginLeft: 0}]} />
                )}
              data={options}
              renderItem={({item}) => (
                <DimensionOption 
                  index={item.index}
                  text={item.text}
                  dimensionId={this.props.uid}
                />
              )}
            />
          )}
          
          {this.state.newOption ? (
            <DimensionOption
              new={true}
              dimensionId={this.props.uid}
              index={newIndex}
            />) : (
            <View style={{ alignItems : 'center', flex: 1 }}>
              <FAIcon.Button
                name='plus'
                backgroundColor={ StyleVariables.primary } 
                onPress={this._onCreateOption}>
                  Create option
              </FAIcon.Button>
            </View>
          )}

        </ScrollView>
      </View>
    )
  }

  _renderNumericForm() {
    return (
      <View style={{ flex: 3, paddingVertical: 10, paddingHorizontal: 15 }}>

        <View style={{ flex: 1, flexDirection:'row', alignContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[ { justifyContent: 'center' }, Styles.h3 ]}>
              Minimum : 
            </Text>
          </View>
          <TextInput 
            placeholder="Set the minimum value"
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [{ flex: 1, alignItems:'center',backgroundColor: 'blue' }, Styles.textInput, Styles.h3 ] }
            onChangeText={min => this.setState({ min })}
            value={_exists(this.state.min) ? this.state.min.toString() : ''}
            length={3}
            keyboardType='numeric'
          />
        </View>

        <View style={{ flexDirection:'row', flex: 1, alignContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[ { justifyContent: 'center' }, Styles.h3 ]}>
              Maximum :
            </Text>
          </View>
          <TextInput 
            placeholder="Set the maximum value"
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [{ flex: 1, alignItems:'center' }, Styles.textInput, Styles.h3 ] }
            onChangeText={max => this.setState({ max })}
            value={_exists(this.state.max) ? this.state.max.toString() : ''}
            length={3}
            keyboardType='numeric'
          />
        </View>

        <View style={{ flexDirection:'row', flex: 1, alignContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[ { justifyContent: 'center' }, Styles.h3 ]}>
              Step :
            </Text>
          </View>
          <TextInput
            placeholder="Optionally, you can set a step"
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [{ flex: 1, alignItems:'center' }, Styles.textInput, Styles.h3 ] }
            onChangeText={step => this.setState({ step })}
            value={''+this.state.step}
            length={3}
            keyboardType='numeric'
          />
        </View>
        <View style={{ flexDirection:'row', flex: 1, alignContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[ { justifyContent: 'center' }, Styles.h3 ]}>
              Unit :
            </Text>
          </View>
          <TextInput 
            placeholder="Optionally, you can set a unit"
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [{ flex: 1, alignItems:'center' }, Styles.textInput, Styles.h3 ] }
            onChangeText={unit => this.setState({ unit })}
            value={this.state.unit}
          />
        </View>
        <View style={{ alignItems : 'center', flex: 1, paddingTop: 20 }}>
          <FAIcon.Button
            name='save'
            backgroundColor={ StyleVariables.primary } 
            onPress={this._onSubmitNumericForm}>
              Save
          </FAIcon.Button>
        </View>
      </View>
    )
  }

  render() {

    const canDelete = !this.props.new
    const _d = this.props.dimension
    const isNumeric = _d && Dim.isNumeric(_d)
    const isRanking = _d && Dim.isRanking(_d)
    const isUnqualified = _d && Dim.isUnqualified(_d)

    return (
      <KeyboardAvoidingView 
        style={ Styles.container } 
        behavior="padding" enabled
        keyboardVerticalOffset={50}
      >

        {this._renderHeader()}

        {isUnqualified && (
          <View style={{ flex: 1 }}>
            <Text>Please choose the kind of dimension you want to set.</Text>
            <Text>It can be either a list of options, or a numerical range.</Text>
          </View>
        )}
        
        {!this.state.isNew && !isNumeric && this._renderOptionList()}
        
        {(isNumeric || isUnqualified ) && this._renderNumericForm()}

        {canDelete && (
          <View style={ Styles.footer }>
            <FAIcon.Button 
              style={{ width: '50%'}} 
              name='trash'
              backgroundColor={StyleVariables.danger}
              onPress={this._onDeleteConfirm}        
            >
              Delete dimension
            </FAIcon.Button>
          </View>
        )}

      </KeyboardAvoidingView>
    )
  }
}

Dimension.propTypes = {
  dimension : PropTypes.object,
  new: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimension)