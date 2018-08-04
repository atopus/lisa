import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'
import Styles from '../Styles'
import { connect } from 'react-redux'
import { 
  updateDimensionOption,
  createDimensionOption,
  deleteDimensionOption,
  editOption
} from '../actions/dimensions'
import {
  getOption,
  getOptionFrequency
} from '../reducers'

const mapStateToProps = (state, props) => ({
  dimensionId: props.dimensionId,
  option: getOption(state, props.dimensionId, props.index),
  frequency: getOptionFrequency(state, props.dimensionId, props.index)
});

const mapDispatchToProps = ({
  updateDimensionOption,
  createDimensionOption,
  deleteDimensionOption,
  editOption
});

class DimensionOption extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit : props.new || false,
      text: props.option ? props.option.text : '',
      new : props.new || false,
      index: props.index
    }
  }

  _onSubmit() {

    if(this.state.new) {
      this.props.createDimensionOption(
        this.props.dimensionId, 
        parseInt(this.props.index), 
        this.state.text
      )
      this.setState({ edit: false, text: '' })
    } else {
      this.props.updateDimensionOption(
        this.props.dimensionId, 
        parseInt(this.props.index), 
        this.state.text
      )
      this.props.editOption(this.props.dimensionId, this.props.index, false)
    }
  }

  _onDelete() {
    this.props.deleteDimensionOption(this.props.dimensionId, this.props.index)
  }

  _renderText() {

    const canDelete = this.props.frequency === 0

    const text = !this.props.option || this.props.option.edit ? (
      <View style={{ flex:1, flexDirection: 'row', alignItems:'center' }} >
        <View style={{ width: '80%'}}>
          <TextInput
            onChangeText={text => this.setState({ text })}
            style={ Styles.textInput }
            multiline={true}
            numberOfLines={4}
          >
            {this.state.text}
          </TextInput>
        </View>
        <View style={{ width: '20%'}}>
          <Button 
            style={{ width: 2 }}
            onPress={() => this._onSubmit()}
            disabled={!this.state.text || !this.state.text.trim()}
            title='ok' 
          />
        </View>
      </View>
    ) : (
      <View style={{ flex:1, flexDirection: 'row', alignItems:'center' }} >
        <TouchableWithoutFeedback
          onPress={() => this.props.editOption(this.props.dimensionId, this.props.index, true)}
        >
          <View style={{ flexDirection: 'row', flex: 1, alignItems:'center' }}>
            <View style={{ width: canDelete ? '90%'  : '100%' }}>
              <Text>
                {this.state.text}
              </Text>
            </View>

            {canDelete && (<View style={{width: '10%'}}>
              <Button
                style={{ width: 1 }}
                onPress={() => this._onDelete()}
                title='x'
              />
            </View>)
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    )

    return (
      <View style={ styles.text }>
        {text}
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        {this.props.option && (
          <View style={ styles.index }>
            <Text>{this.props.index}.</Text>
          </View>
        )}
        {this._renderText()}
      </View>
    )
  }
}

const left = 5;
const right = 100 - left;

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: 5,
    width: '100%'
  },
  index : {
    width: `${left}%`,
    justifyContent: 'center'
  },
  text : {
    width: `${right}%`
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DimensionOption)