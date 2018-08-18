import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import Styles, * as StyleVariables from '../Styles'

import { createDimension } from '../actions/dimensions'

import { ORDINAL, NUMERICAL } from '../constants'

const mapDispatchToProps = {
  createDimension
}

class CreateDimension extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      label : '',
      type : null
    }
  }

  static navigationOptions = {
    title: 'Create dimension'
  }

  _onCreate = () => {
    const uid = this.props.createDimension({
      label: this.state.label,
      type: this.state.type
    })
    this.props.navigation.navigate('Dimension', { dimensionId: uid })
  }

  _onSetLabel = label => {
    this.setState({ label })
  }

  _setNumeric = () => {
    this.setState({ type: NUMERICAL })
  }

  _setOrdinal = () => {
    this.setState({ type: ORDINAL })
  }

  _renderSwitch = ( active, action ) => {

    // Background on
    const onTintColor = StyleVariables.PRIMARY.lighter
    // Background off
    const tintColor = StyleVariables.lightgrey
    // Foreground swith grip
    const thumbTintColor =  active ? StyleVariables.primary : StyleVariables.lightgrey 

    return (
      <Switch 
        onTintColor={onTintColor}
        tintColor={tintColor}
        thumbTintColor={thumbTintColor}
        onValueChange={action}
        value={active}
      />
    )
  }

  render() {

    const canCreate = this.state.label !== '' && this.state.type !== null

    return (
      <View style={ [ Styles.container, { paddingHorizontal: 20 } ] }>
        
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            placeholder={"Dimension name"}
            onChangeText={this._onSetLabel}
            style={ [ Styles.textInput, Styles.h2 ]}
            underlineColorAndroid={StyleVariables.lightgrey}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={ [Styles.p, { alignItems: 'center' }] }>Please choose the kind of dimension you want to set. it can be either ordinal or numerical.</Text>
        </View>

        <View style={ style.switchGroup }>
          <View style={ style.switchPanel }>
            <View style={ style.switchPanelInstruction } >
              <Text style={ Styles.p }>An ordinal scale sort "options" from a "less" to a "more". It leaves room for interpretation.</Text>
              <Text style={ Styles.p }>For instance : "my worst day ever", "Have seen better", "It was good", "My best day ever".</Text>
            </View>
            <View style={ style.switchPanelSwitch }>
              {this._renderSwitch(this.state.type === ORDINAL,this._setOrdinal )}
            </View>
          </View>
          <View style={ Styles.separator } />
          <View style={ style.switchPanel }>
            <View style={ style.switchPanelInstruction } >
              <Text style={ Styles.p }>A numerical scale can be some objective account.</Text>
              <Text style={ Styles.p}>For instance : How many miles/km did I run today ?</Text>
            </View>
            <View style={ style.switchPanelSwitch }>
              {this._renderSwitch(this.state.type === NUMERICAL, this._setNumeric)}
            </View>
          </View>
        </View>

        <View style={ Styles.footer }>
          <FAIcon.Button
            onPress={this._onCreate}
            name='plus'
            backgroundColor={ canCreate ? StyleVariables.primary : StyleVariables.lightgrey}
            style={{ width: '50%' }}
            disabled={!canCreate}
          >Create</FAIcon.Button>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  switchGroup : {
    flex: 4,
    padding: 10,
    marginVertical : 15,
    borderWidth: 1,
    borderColor: StyleVariables.lightgrey,
    borderRadius: 5
  },
  switchPanel : {
    flex: 1, 
    justifyContent: 'center', 
    flexDirection: 'row'
  },
  switchPanelInstruction : {
    flex: 8,
    justifyContent: 'center'
  },
  switchPanelSwitch : {
    justifyContent: 'center'
  }
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(CreateDimension)