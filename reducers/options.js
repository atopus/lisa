import { combineReducers } from 'redux'
import {
  CREATE_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION 
} from '../constants'

const byDimIdx = (state = {}, action) => {

  const option = action.payload

  switch(action.type) {

    case CREATE_OPTION:
      return {
        ...state,
        [option.uid] : option
      }

    case UPDATE_OPTION:
      return {
        ...state,
        [option.uid] : option
      }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case CREATE_OPTION:
      return [
        ...state,
        action.payload.uid
      ]

    case DELETE_OPTION:
      return state.filter(uid => uid !== action.payload.uid )

    default:
      return state
  }
}

export default combineReducers({
  byDimIdx,
  allIds
})

export const getOption = (state, uid) => state.byId[uid]
export const getOptions = state => state.allIds.map(id => state.byId[id])