import uuidv1 from 'uuid/v1'
import {
  ADD_DIMENSION,
  UPDATE_DIMENSION,
  SET_VALUE,
  ADD_DIMENSION_OPTION,
  UPDATE_DIMENSION_OPTION,
  REMOVE_DIMENSION_OPTION,
  EDIT_DIMENSION_OPTION,
  REMOVE_DIMENSION
} from '../constants/actions';

export const editOption = (uid, index, edit) => ({
  type: EDIT_DIMENSION_OPTION,
  payload : {
    uid,
    option : {
      index,
      edit
    }
  }
})

export const saveValue = (uid, date, value) => ({
  type: SET_VALUE,
  payload: { 
    uid, 
    value: { [date] : value }
  }
});

export const createDimension = label => dispatch => {

  const uid = uuidv1()
  
  dispatch({
    type: ADD_DIMENSION,
    payload: {
      uid,
      label
    }
  })

  return uid
}

export const updateDimension = (uid, label) => ({
  type: UPDATE_DIMENSION,
  payload : {
    uid,
    label
  }
})

export const removeDimension = uid => ({
  type: REMOVE_DIMENSION,
  payload : {
    uid
  }
})

export const createOption = (dimensionId, index, text) => ({
  type: ADD_DIMENSION_OPTION,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const updateOption = (dimensionId, index, text) => ({
  type: UPDATE_DIMENSION_OPTION,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const deleteOption = (dimensionId, index) => ({
  type: REMOVE_DIMENSION_OPTION,
  payload: {
    uid: dimensionId,
    option : {
      index
    }
  }
})

