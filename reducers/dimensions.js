import { combineReducers } from 'redux'
import {
  CREATE_DIMENSION,
  UPDATE_DIMENSION,
  DELETE_DIMENSION,
  SORT_DIMENSIONS
} from '../constants'

const byId = (state = {}, action) => {

  const dimension = action.payload

  switch(action.type) {

    case CREATE_DIMENSION:
      return {
        ...state,
        [dimension.uid] : dimension
      }

    case UPDATE_DIMENSION:
      return {
        ...state,
        [dimension.uid] : dimension
      }
    default:
      return state
  }
}

const allIds = (state = [], action) => {

  switch(action.type) {
    case CREATE_DIMENSION:
      return [
        ...state,
        action.payload.uid
      ]

    case DELETE_DIMENSION:
      return state.filter(uid => uid !== action.payload.uid )

    case SORT_DIMENSIONS:
      return action.payload

    default:
      return state
  }
}

export default combineReducers({
  byId,
  allIds
})

export const getDimension = (state, uid) => state.byId[uid]
export const getDimensions = state => state.allIds.map(id => state.byId[id])
export const getDimensionIds = state => state.allIds
export const getDimensionOrder = state => state.allIds