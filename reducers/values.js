import { combineReducers } from 'redux'
import {
  SET_VALUE,
  REMOVE_VALUE
} from '../constants'

const byDimDate = (state = {}, action) => {

  switch(action.type) {

    case SET_VALUE:

      const dimension = action.payload
      if(!dimension)       throw new Error("Missing dimension")
      if(!dimension.uid)   throw new Error("Missing dimension id")
      if(!dimension.value) throw new Error("Missing value")
      const value = dimension.value
      return {
        ...state,
        [dimension.uid] : {
          ...state[dimension.uid],
          ...value
        } 
      }

    case REMOVE_VALUE:
      const dim = action.payload
      const val = dim.value
      const newState = { ...state }
      const key = Object.keys(val)[0]
      delete newState[dim.uid][key]
      return newState

    default:
      return state
  }
}

export default combineReducers({
  byDimDate,
})

export const getValue = (state, dimensionId, date) => state.byDimDate[dimensionId] && state.byDimDate[dimensionId][date] || null
export const getValues = (state, dimensionId) => state.byDimDate[dimensionId] || {}