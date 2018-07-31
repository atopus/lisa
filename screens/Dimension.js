import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Button, FlatList, StyleSheet } from 'react-native'
import { Styles } from '../Styles'
import { getData } from '../services/Provider'
import DimensionOption from './DimensionOption'

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
      <View style={ styles.header }>
        <Text style={ styles.h1 }>{this.props.label}</Text>
      </View>
    )
  }

  renderModList() {
    return (
      <View style={ styles.list }>
      <ScrollView style={{ paddingHorizontal:15 }}>
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
      </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        {this.renderHeader()}
        {this.renderModList()}
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