import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
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
      <View style={ styles.container }>
        <View style={ styles.index }>
          <Text>{this.props.index}.</Text>
        </View>
        <View style={ styles.text }>
        <TextInput 
          style={{ 
            backgroundColor:'white', 
            borderColor: '#eee',
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

const left = 5;
const right = 100 - left;

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: 5
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