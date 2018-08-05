import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native'
import Styles, * as StyleVariables from '../Styles'
import DimensionOption from './DimensionOption'
import { TextInput } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome';

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
  const options = dimension ? Object.keys(dimension.options).map(key => ({
    key,
    index: parseInt(key),
    text : dimension.options[key].text
  })) : []

  return {
    uid,
    label: dimension ? dimension.label : null,
    options,
    new : props.navigation.state.params.new || false
  } 
}

const mapDispatchToProps = {
  createDimension,
  updateDimension,
  removeDimension
}

class Dimension extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: props.navigation.state.params.new || false,
      label: props.label,
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


  _onSubmit() {

    if(this.state.isNew) {
      const uid = this.props.createDimension(this.state.label)
      this.props.navigation.navigate('Dimension', { dimensionId: uid })
    } else {
      this.props.updateDimension(this.props.uid, this.state.label)
    }

    this.setState({ edit: false, isNew : false })
  }

  _renderHeader() {
    return this.state.edit ? (
      <View style={ Styles.header } >
        <View style={{ width: '70%' }}>
          <TextInput 
            underlineColorAndroid={StyleVariables.lightgrey}
            style={ [Styles.textInput, Styles.h1 ] }
            onChangeText={label => this.setState({ label }) }
          >
            {this.state.label}
          </TextInput>
        </View>
        <View style={{ width: '25%', flexDirection: 'row', flex:1, justifyContent: 'space-around' }}>
          <FAIcon.Button
            name='check'
            backgroundColor={StyleVariables.success}
            onPress={() => this.state.label && this._onSubmit()}
            disabled={!this.state.label || !this.state.label.trim()} 
          />
          <FAIcon.Button
            name='minus'
            backgroundColor={StyleVariables.warning}
            onPress={() => this.setState({ edit: false })}
          />
        </View>
      </View>
    ) : (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ edit: true })}
      >
        <View style={ Styles.header }>
          <Text style={ Styles.h1 }>{this.state.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderOptionList() {

    const newIndex = this.props.options.length > 0 ?
      Math.max.apply(1, this.props.options.map(o => parseInt(o.index))) + 1 :
      0

    return (
      <View style={{ flex: 5 }}>
        <ScrollView style={ Styles.scrollList }>
          <FlatList
            ItemSeparatorComponent={({highlighted}) => (
                  <View style={[Styles.separator, highlighted && {marginLeft: 0}]} />
              )}
            data={this.props.options}
            renderItem={({item}) => {
              return <DimensionOption 
                index={item.index}
                text={item.text}
                dimensionId={this.props.uid}
              />
            }} />
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
                onPress={() => this.setState({ newOption : true })}>
                  Create option
                </FAIcon.Button>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }

  render() {

    const canDelete = !this.props.new

    const deleteConfirmation = () => Alert.alert('Are you sure ?', '', [
        {
          'text' : "Yes !", 
          onPress : () => {
            this.props.removeDimension(this.props.uid)
            this.props.navigation.navigate('Home')
          }
        },
        {
          'text' : 'Nope'
        }
      ],
      { cancelable: true }  
    )

    return (
      <KeyboardAvoidingView 
        style={ [ Styles.container ]  } 
        behavior="padding" enabled
        keyboardVerticalOffset={50}
        >
        {this._renderHeader()}
        {!this.state.isNew && this._renderOptionList()}


        {canDelete && (
          <View style={ Styles.footer }>
            <FAIcon.Button 
              style={{ width: '50%'}} 
              name='trash'
              backgroundColor={StyleVariables.danger}
              onPress={() => deleteConfirmation() }        
            >
              Delete dimension
            </FAIcon.Button>
          </View>
        )}

      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimension)