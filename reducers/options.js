import { combineReducers } from 'redux'
import {
  SET_OPTION,
  DELETE_OPTION,
  EDIT_OPTION
} from '../constants'

const byDimIdx = (state = {}, action) => {

  const dimension = action.payload

  switch(action.type) {

    case SET_OPTION:

      const o = dimension.option
      return {
        ...state,
        [dimension.uid] : {
          ...state[dimension.uid],
          [o.index] : {
            index: o.index,
            text: o.text,
            edit: false
          }
        }
      }

    case DELETE_OPTION:
      const opt = dimension.option

      const newState = state[dimension.uid]
      delete newState[opt.index]
      return newState

    default:
      return state
  }
}

const editInit = { dimensionId : null, index: null }

const edit = (state = editInit, action) => {
  switch(action.type) {
    case EDIT_OPTION :
      const { uid, option } = action.payload 
      return (
        state.dimensionId === uid &&
        state.index === option.index
      ) ? editInit : {
        dimensionId: uid,
        index: option.index
      } 

    default:
      return state
  }
}

export default combineReducers({
  byDimIdx,
  edit
})

export const getOption = (state, dimensionId, index) => 
  state.byDimIdx[dimensionId] && state.byDimIdx[dimensionId][index]

export const getOptions = (state, dimensionId) => 
  state.byDimIdx[dimensionId] || {}

export const isEditingOption = (state, dimensionId, index) =>
  state.edit.dimensionId === dimensionId &&
  state.edit.index === index