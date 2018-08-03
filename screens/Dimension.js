import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Button, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Styles from '../Styles'
import DimensionOption from './DimensionOption'
import { TextInput } from 'react-native-gesture-handler';

import {
  getDimension
} from '../reducers'
import {
  createDimension,
  updateDimension
} from '../actions/dimensions'

const mapStateToProps = (state, ownProps) => {
  const uid = ownProps.navigation.state.params.dimensionId
  const dimension = uid ? getDimension(state, uid) : null 
  // const data = getData(uid)
  const options = dimension ? Object.keys(dimension.options).map(key => ({
    key,
    index: parseInt(key),
    text : dimension.options[key].text
  })) : []

  return {
    uid,
    label: dimension ? dimension.label : null,
    options,
    new : false
  } 
}

const mapDispatchToProps = {
  createDimension,
  updateDimension
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
    title: 'Dimension'
  })


  _onSubmit() {

    this.state.isNew ?
      this.props.createDimension(this.state.label) :
      this.props.updateDimension(this.props.uid, this.state.label)

    this.setState({ edit: false, isNew : false })
  }

  renderHeader() {
    return this.state.edit ? (
      <View style={{ flex:1, flexDirection: 'row', alignItems:'center' }} >
        <View style={{ width: '80%' }}>
          <TextInput 
            style={ Styles.textInput }
            onChangeText={label => this.setState({ label }) }
          >
            {this.state.label}
          </TextInput>
        </View>
        <View style={{ width: '20%' }}>
          <Button
            title='ok'
            style={{ width: 2 }}
            onPress={() => this._onSubmit()}
            disabled={!this.state.label || !this.state.label.trim()} 
          />
        </View>
      </View>
    ) : (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ edit: true })}
      >
        <View style={ styles.header }>
          <Text style={ styles.h1 }>{this.state.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderModList() {

    const newIndex = this.props.options.length > 0 ?
      Math.max.apply(1, this.props.options.map(o => parseInt(o.index))) + 1 :
      1

    return (
      <View style={ styles.list }>
        <ScrollView style={{ paddingHorizontal:15 }}>
          <FlatList
            data={this.props.options}
            renderItem={({item}) => {
              return <DimensionOption 
                index={item.key}
                text={item.text}
                dimensionId={this.props.uid}
                navigation={this.props.navigation}
              />
            }} />
          {this.state.newOption ? (
            <DimensionOption
              new={true}
              dimensionId={this.props.uid}
              navigation={this.props.navigation}
              index={newIndex}
            />) : (
            <View style={{ alignItems : 'center', width: '50%'}}>
              <Button 
                title='+' 
                onPress={() => this.setState({ newOption : true })} />
            </View>
          )}
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        {this.renderHeader()}
        {!this.state.isNew && this.renderModList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header : {
    flex: 1,
    alignItems : 'center', 
    justifyContent : 'center'
  },
  list : {
    flex: 5,
  },
  h1 : {
    fontSize: 40
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimension)