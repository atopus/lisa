import { combineReducers } from 'redux'
import {
  CREATE_VALUE,
  UPDATE_VALUE,
  DELETE_VALUE 
} from '../constants'

const byDateId = (state = {}, action) => {

  const value = action.payload

  switch(action.type) {

    case CREATE_VALUE:
      return {
        ...state,
        [value.uid] : value
      }

    case UPDATE_VALUE:
      return {
        ...state,
        [value.uid] : value
      }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case CREATE_VALUE:
      return [
        ...state,
        action.payload.uid
      ]

    case DELETE_VALUE:
      return state.filter(uid => uid !== action.payload.uid )

    default:
      return state
  }
}

export default combineReducers({
  byDateId,
  allIds
})

export const getValue = (state, uid) => state.byId[uid]
export const getValues = state => state.allIds.map(id => state.byId[id])