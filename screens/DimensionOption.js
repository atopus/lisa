import React from 'react'
import { View, Text, TextInput } from 'react-native'
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

  _onChangeText(value) {
    this.props.updateDimensionOption(this.props.dimensionId, this.props.index, value)
  }

  render() {
    return (
      <View style={{ 
        flex: 1, 
        paddingHorizontal: 15,
        flexDirection: 'row'
      }}>
        <View>
          <Text>{this.props.index}.</Text>
        </View>
        <View>
        <TextInput 
          style={{ 
            backgroundColor:'white', 
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 5
          }}
          onChangeText={text => this._onChangeText(text)}
          multiline={true}
          numberOfLines={4}>
            {this.props.text}
          </TextInput>
          </View>
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DimensionOption)