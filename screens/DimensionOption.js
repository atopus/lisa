import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { updateDimensionOption } from '../actions/dimensions'

const mapStateToProps = (state, props) => ({
  dimensionId: props.dimensionId,
  index: props.index
});

const mapDispatchToProps = ({
  updateDimensionOption : updateDimensionOption
});

class DimensionOption extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit : props.new || false,
      text: props.text,
      new : false
    }
  }

  _onSubmit() {

    this.props.updateDimensionOption(this.props.dimensionId, parseInt(this.props.index), this.state.text)
    this.setState({ edit: false })
  }

  _renderText() {

    const text = this.state.edit ? (
      <View style={{ flex:1, flexDirection: 'row', alignItems:'center' }} >
        <View style={{ width: '80%'}}>
          <TextInput
            onChangeText={text => this.setState({ text })}
            style={ styles.textInput }
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
  },
  textInput : {
    backgroundColor:'white', 
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DimensionOption)