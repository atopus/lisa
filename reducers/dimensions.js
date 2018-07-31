import { combineReducers } from 'redux'
import {
  LOAD_DIMENSIONS_SUCCESS,
  ADD_DIMENSION,
  SET_VALUE_SUCCESS,
  UPDATE_DIMENSION_OPTION,
  ADD_DIMENSION_OPTION,
  REMOVE_DIMENSION_OPTION,
  SORT_DIMENSION_OPTION,
  REMOVE_VALUE_SUCCESS,
  SET_DIMENSION_THRESHOLD_SUCCESS
} from '../constants/actions';
import { Object } from 'core-js';

const option = (state={}, action) => {

  const { text, index } = action.payload

  switch(action.type) {

    case UPDATE_DIMENSION_OPTION:
      if(action.payload.index !== state.index) return state
      return { ...state, text }      

    case ADD_DIMENSION_OPTION:
      return { text, index }

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

  const { date, value } = action.payload

  switch(action.type) {

    case SET_VALUE:
      return { [date] : value }

    default:
      return state
  }
}

const values = (state = {}, action) => {
  switch(action.type) {
    case SET_VALUE_SUCCESS:
      return {
      ...state,
      [date] : value
    }
    case REMOVE_VALUE_SUCCESS:
      const newState = {}
      const newIds = Object.keys(state).filter(v => v !== action.payload)
      newIds.forEach(n => newState[n] = newState[n])

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

  const { id, label, thresholds, options, values } = action.payload
  switch(action.type) {

    case ADD_DIMENSION:
      if(!id || !label) throw new Error("Missing argument.")
      return { id, label }

    case LOAD_DIMENSIONS_SUCCESS:
    case UPDATE_DIMENSION_OPTION:
      if(state.id !== action.payload.id) return state    
      return { id, label }

    default:
      return state
  }
}

const dimensions = (state = [], action) => {
  
  switch(action.type) {

    case LOAD_DIMENSIONS_SUCCESS:
    case ADD_DIMENSION_OPTION:
    case REMOVE_DIMENSION_OPTION:
    case UPDATE_DIMENSION_OPTION:
    case SORT_DIMENSION_OPTION:
      const dimensions = action.payload
      return dimensions.map(d =>  
        dimension(d, action)
      )

    case ADD_DIMENSION:
      return [
        ...state,
        dimension(undefined, action)
      ]

    case UPDATE_DIMENSION_OPTION:
    case SET_VALUE_SUCCESS:
    case LOAD_VALUES_SUCCESS:
      return state.map(d => dimension(d, action))

    default:
      return state;
  }
}

// export default combineReducers({
//   dimensions
// })
export default dimensions