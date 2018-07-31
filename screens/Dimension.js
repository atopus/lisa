import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, FlatList } from 'react-native'
import { getData } from '../services/Provider'
import DimensionOption from './DimensionOption'
import {
  getScale
} from '../reducers'

const mapStateToProps = (state, ownProps) => {
  const uid = ownProps.navigation.state.params.dimensionId
  const data = getData(uid)
  const scale = Object.keys(data.options).map(key => ({
    key,
    text : data.options[key]
  }))
  return {
    id: uid,
    label: data.label,
    scale: scale
  } 
}

const mapDispatchToProps = {

}

class Dimension extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dimension'
  })

  renderHeader() {
    return (
      <View>
        <Text style={{ fontSize: 40 }}>{this.props.label}</Text>
      </View>
    )
  }

  renderModList() {
    return (
      <View>
        <FlatList
          data={this.props.scale}
          renderItem={({item}) => {
            return <DimensionOption 
              index={item.key}
              text={item.text}
              dimensionId={this.props.id}
              navigation={this.props.navigation}
            />
          }} />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        {this.renderModList()}
      </View>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimension)