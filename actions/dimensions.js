import uuidv1 from 'uuid/v1'
import {
  CREATE_DIMENSION,
  UPDATE_DIMENSION,
  SET_VALUE,
  CREATE_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
  EDIT_OPTION,
  DELETE_DIMENSION
} from '../constants';

export const editOption = (uid, index, edit) => ({
  type: EDIT_OPTION,
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
    type: CREATE_DIMENSION,
    payload: {
      uid,
      label
    }
  })

  return uid
}

export const updateDimension = dimension => ({
  type: UPDATE_DIMENSION,
  payload : dimension
})

export const removeDimension = uid => ({
  type: DELETE_DIMENSION,
  payload : {
    uid
  }
})

export const createOption = (dimensionId, index, text) => ({
  type: CREATE_OPTION,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const updateOption = (dimensionId, index, text) => ({
  type: UPDATE_OPTION,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const deleteOption = (dimensionId, index) => ({
  type: DELETE_OPTION,
  payload: {
    uid: dimensionId,
    option : {
      index
    }
  }
})

