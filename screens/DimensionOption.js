import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'
import Styles from '../Styles'
import { connect } from 'react-redux'
import { 
  updateDimensionOption,
  createDimensionOption
} from '../actions/dimensions'

const mapStateToProps = (state, props) => ({
  dimensionId: props.dimensionId,
  index: props.index
});

const mapDispatchToProps = ({
  updateDimensionOption,
  createDimensionOption
});

class DimensionOption extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit : props.new || false,
      text: props.text,
      new : props.new || false
    }
  }

  _onSubmit() {

    this.state.new ?
      this.props.createDimensionOption(this.props.dimensionId, parseInt(this.props.index), this.state.text) :
      this.props.updateDimensionOption(this.props.dimensionId, parseInt(this.props.index), this.state.text)
    
      this.setState({ edit: false })
  }

  _renderText() {

    const text = this.state.edit ? (
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
          onPress={() => this.setState({ edit : !this.state.edit })}
        >
          <View>
            <Text>
              {this.state.text}
            </Text>
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
        <View style={ styles.index }>
          <Text>{this.props.index}.</Text>
        </View>
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