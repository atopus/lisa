import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Styles, * as StyleVariables from '../Styles'
import { connect } from 'react-redux'
import { 
  updateOption,
  createOption,
  deleteOption,
  editOption
} from '../actions/dimensions'
import {
  getOption,
  getOptionFrequency,
  isEditingOption
} from '../reducers'
import FAIcon from 'react-native-vector-icons/FontAwesome';

const mapStateToProps = (state, props) => ({
  dimensionId: props.dimensionId,
  index: props.index,
  option: getOption(state, props.dimensionId, props.index),
  frequency: getOptionFrequency(state, props.dimensionId, props.index),
  editing: isEditingOption(state, props.dimensionId, props.index)
})

const mapDispatchToProps = ({
  updateOption,
  createOption,
  deleteOption,
  editOption
});

class DimensionOption extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      edit : props.new || props.editing || false,
      text: props.option ? props.option.text : '',
      new : props.new || false
    }
  }

  _onSubmit = () => {

    if(this.state.new) {
      this.props.createOption(
        this.props.dimensionId, 
        parseInt(this.props.index), 
        this.state.text
      )
      this.setState({ edit: false, text: '' })
    } else {
      this.props.updateOption(
        this.props.dimensionId, 
        parseInt(this.props.index), 
        this.state.text
      )
      this.props.editOption(this.props.dimensionId, this.props.index, false)
    }
    this.props.onSubmitOption()
  }

  _editOption = () => {
    this.props.editOption(this.props.dimensionId, this.props.index)
  }

  _onDelete = () => {
    this.props.deleteOption(this.props.dimensionId, this.props.index)
  }

  _onChange = (text) => {
    this.setState({ text })
  }

  _renderText() {

    const canDelete = this.props.frequency === 0

    const text = 
      !this.props.option || 
      this.props.option.edit || 
      this.props.editing ? (

      // Text Input
      <View style={ styles.textWrapper } >
        <View style={{ width: '80%'}}>
          <TextInput
            underlineColorAndroid={StyleVariables.lightgrey}
            onChangeText={this._onChange}
            style={ Styles.textInput }
            multiline={true}
            numberOfLines={4}
            value={this.state.text}
          />
        </View>
        <View style={{ width: '20%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <FAIcon
            style={ Styles.buttonIcon }
            size={16}
            name="check"
            color={StyleVariables.success}
            onPress={this._onSubmit}
            disabled={!this.state.text || !this.state.text.trim()} 
          />
          <FAIcon
            style={ Styles.buttonIcon }
            size={16}
            name="ban"
            color={StyleVariables.warning}
            onPress={this._editOption}
          />
        </View>
      </View>

    ) : (

      // Label
      <TouchableWithoutFeedback onPress={this._editOption} >

        <View style={ styles.textWrapper }>
        
          <Text style={[ Styles.p , { width: canDelete ? '90%'  : '100%' } ]}>
            {this.state.text}
          </Text>

          {canDelete && (
            <View style={{ width: '10%' }}>
              <FAIcon
                name='trash'
                style={ Styles.p }
                size={10}
                onPress={this._onDelete}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    )

    return (
      <View style={ styles.text }>
        {text}
      </View>
    )
  }

  _renderIndex() {
    return (
      <View style={ styles.index }>
        <Text style={ Styles.p }>{this.props.index}.</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.row }>
        {this.props.option && this._renderIndex()}
        {this._renderText()}
      </View>
    )
  }
}

const left = 5;
const right = 100 - left;

const styles = StyleSheet.create({
  row : {
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: 5
  },
  index : {
    width: `${left}%`,
    justifyContent: 'center',
  },
  textWrapper : {
    flex: 1, 
    flexDirection: 'row', 
    alignItems:'center', 
    minHeight: 35
  },
  text : {
    width: `${right}%`
  }
})

DimensionOption.propTypes = {
  dimensionId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  option: PropTypes.object,
  frequency: PropTypes.number
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DimensionOption)