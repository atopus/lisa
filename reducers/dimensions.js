import { combineReducers } from 'redux'
import {
  LOAD_DIMENSIONS,
  ADD_DIMENSION,
  SET_VALUE,
  ADD_DIMENSION_OPTION,
  UPDATE_DIMENSION_OPTION,
  REMOVE_DIMENSION_OPTION,
  REMOVE_DIMENSION,
  UPDATE_DIMENSION,
  SORT_DIMENSION_OPTION,
  REMOVE_VALUE,
  LOAD_VALUES,
  EDIT_DIMENSION_OPTION
} from '../constants/actions';

const option = (state={}, action) => {

  const { text, index } = action.payload

  switch(action.type) {

    case UPDATE_DIMENSION_OPTION:
      if(action.payload.index !== state.index) return state
      return { ...state, text }     

    case ADD_DIMENSION_OPTION:
      return { text, index, edit : false }

    case EDIT_DIMENSION_OPTION:
      if(state.index !== index) return state
      const { edit } = action.payload
      return { ...state, edit }

    default:
      return state
  }
}

const options = (state = [], action) => {
  switch(action.type) {

    case ADD_DIMENSION_OPTION:
      return [
        ...state,
        option(undefined, action)
      ]
    case UPDATE_DIMENSION_OPTION:
    case EDIT_DIMENSION_OPTION:
      return state.map(o => option(o, action))

    case REMOVE_DIMENSION_OPTION:
      return state.filter(o => o.index !== action.payload.index)

    case SORT_DIMENSION_OPTION :
      console.warn("SORT_DIMENSION_OPTION not implemented.")
      return state

    case UPDATE_DIMENSION_OPTION:
      return state.map(o => option(o, action))

    case REMOVE_DIMENSION_OPTION:
      return state.filter(o => o.index !== action.payload)

    default: 
      return state
  }
}

const value = (state = {}, action) => {

  switch(action.type) {

    case SET_VALUE:
      return action.payload

    default:
      return state
  }
}

const values = (state = {}, action) => {

  const date = Object.keys(action.payload)[0]
  
  switch(action.type) {
    case SET_VALUE:
      return {
      ...state,
      ...value(state[date], action)
    }
    case REMOVE_VALUE:
      const newState = {}
      const delId = Object.keys(action.payload)[0]
      const newIds = Object.keys(state).filter(v => v !== delId)
      newIds.forEach(n => newState[n] = newState[n])
      return newState

    case LOAD_VALUES:
      return action.payload

    default:
      return state
  }
}

const thresholds = (state = [], action) => {
  switch(action.type) {
    default:
      return state
  }
}

const dimension = (state = {}, action) => {

  const { uid, label, max, min, step, unit } = action.payload
  switch(action.type) {

    case ADD_DIMENSION:
      if(!uid || !label) throw new Error("Missing argument.")
      return {
        uid,
        label,
        options : options(undefined, action),
        values : value(undefined, action),
        max: null,
        min: null,
        unit: '',
        step: 1
      }
    
    case UPDATE_DIMENSION:
      if(!uid || !label) throw new Error("Missing argument.")
      if(uid !== state.uid) return state
      return { ...state, label, max, min, step, unit }

    case SET_VALUE :
    case REMOVE_VALUE:
      if(state.uid !== action.payload.uid) return state
      const valueOption = {
        type: action.type,
        payload : action.payload.value
      }
      return {
        ...state,
        values: values(state.values, valueOption)
      }

    case LOAD_VALUES:
      if(state.uid !== action.payload.uid) return state
      const valuesOption = {
        type: action.type,
        payload: action.payload.values
      }
      return {
        ...state,
        values: values(state.values, valuesOption)
      }
    case LOAD_DIMENSIONS:
    case UPDATE_DIMENSION_OPTION:
    case ADD_DIMENSION_OPTION:
    case REMOVE_DIMENSION_OPTION:
    case UPDATE_DIMENSION_OPTION:
    case EDIT_DIMENSION_OPTION:
      if(state.uid !== action.payload.uid) return state
      const optionAction = {
        type: action.type,
        payload: action.payload.option
      }  
      return {
        ...state,
        options: options(state.options, optionAction)
      }

    default:
      return state
  }
}

export const dimensions = (state = [], action) => {
  
  switch(action.type) {

    case SET_VALUE:
    case LOAD_VALUES:
    case REMOVE_VALUE:
    case ADD_DIMENSION_OPTION:
    case UPDATE_DIMENSION_OPTION:
    case REMOVE_DIMENSION_OPTION:
    case EDIT_DIMENSION_OPTION:
    case UPDATE_DIMENSION:
    case SORT_DIMENSION_OPTION:
      return state.map(d =>  
        dimension(d, action)
      )

    case ADD_DIMENSION:
      return [
        ...state,
        dimension(undefined, action)
      ]

    case REMOVE_DIMENSION:
      return state.filter(dimension => dimension.uid !== action.payload.uid)

    case LOAD_DIMENSIONS:
      return action.payload

    default:
      return state;
  }
}

export const getDimensions = state => state.dimensions

export const getDimension = (state, uid) => {
  if(!uid) throw new Error("Missing argument uid")
  const dimensions = getDimensions(state)
  return dimensions ? dimensions.find(d => d.uid === uid) : false
}

export const getValues = (state, uid) => {
  const dimension = getDimension(state, uid)  
  return dimension ? dimension.values : []
}
export const getValue = (state, uid, date) => {
  const values = getValues(state, uid)
  return values ? values[date] : false
}

export const getOptions = (state, uid) => {
  const dimension = getDimension(state, uid)
  return dimension ? dimension.options : []
}

export const getOption = (state, uid, index) => {
  const options = getOptions(state, uid)
  return options ? options.find(o => o.index === index) : false
}

export const getThresholds = (state, uid) => {
  const dimension = getDimension(state, uid)
  return dimension ? dimension.thresholds : []
}

export default combineReducers({
  dimensions
})