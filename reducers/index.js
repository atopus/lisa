import { combineReducers } from 'redux'
import {
  LOAD_VALUES,
  SET_DATE,
  APP_LOADING,
} from '../constants'
import dimensions, * as fromDimensions from './dimensions'
import values, * as fromValues from './values'
import options, * as fromOptions from './options'

import moment from 'moment/min/moment-with-locales'
moment.locale('fr')

const initialApp = {
  loading : false,
  networking: false,
  storage : false
}

const app = (state = initialApp, action) => {
  switch(action.type) {

    case APP_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case LOAD_VALUES :
      return {
        ...state,
        loading: true
      }

    default:
      return state
  }
}

const home = (state = { date : moment().format('YYYYMMDD') }, action) => {
  switch(action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  app,
  home,
  dimensions,
  options,
  values
})

export const getDimensions = state => 
  fromDimensions.getDimensions(state.dimensions)

export const getDimension = (state, uid, full) => {
  const dimension = fromDimensions.getDimension(state.dimensions, uid)
  if(full) {
    dimension.options = getOptions(state, uid)
    dimension.values = getValues(state, uid)
  }
  return dimension
}

export const getDimensionOrder = state =>
  fromDimensions.getDimensionOrder(state.dimensions)

export const getDimensionIds = state => 
  fromDimensions.getDimensionIds(state.dimensions)

export const getValues = (state, uid) => 
  fromValues.getValues(state.values, uid)

export const getValuesMap = (state, uid) => {
  const valuesObject = getValues(state, uid)
  const map = Object.keys(valuesObject).map(key => ({ 
    date : key,
    value : valuesObject[key] }))
  return map
}

export const getValue = (state, uid, date) => 
  fromValues.getValue(state.values, uid, date)

export const getOptions = (state, dimensionId) => 
  fromOptions.getOptions(state.options, dimensionId)

export const getOption = (state, uid, index) =>
  fromOptions.getOption(state.options, uid, index)

export const getOptionFrequency = (state, dimensionId, value) => {
  const values = getValuesMap(state, dimensionId)
  const reducer = (accumulator, currentValue) => currentValue.value === value ?
    accumulator + 1 : accumulator
  const result = values.reduce(reducer, 0)
  return result
}

export const isEditingOption = (state, dimensionId, index) =>
  fromOptions.isEditingOption(state.options, dimensionId, index)

export const getThresholds = (state, uid) =>
  fromDimensions.getThresholds(state.dimensions, uid)

export const getDate = state => state.home.date
export const getDimensionScale = (state, dimensionId) =>
  state.dimensions[dimensionId] && 
  state.dimensions[dimensionId].scale ?
    state.dimensions[dimensionId].scale : {}

export const getStorageAvailability = state => state.app.storage
export const getNetworkAvailability = state => state.app.networking
