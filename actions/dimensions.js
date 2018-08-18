import uuidv1 from 'uuid/v1'
import {
  CREATE_DIMENSION,
  UPDATE_DIMENSION,
  SORT_DIMENSIONS,
  SET_VALUE,
  SET_OPTION,
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

export const createDimension = ({ label, type }) => dispatch => {

  const uid = uuidv1()
  
  dispatch({
    type: CREATE_DIMENSION,
    payload: {
      uid,
      label,
      type
    }
  })

  return uid
}

export const updateDimension = dimension => ({
  type: UPDATE_DIMENSION,
  payload : dimension
})

// Should it be renamed deleteDimension for coherence ?
export const removeDimension = uid => ({
  type: DELETE_DIMENSION,
  payload : {
    uid
  }
})

// Must be checked.
export const sortDimensions = newOrder => ({
  type: SORT_DIMENSIONS,
  payload: newOrder
})

export const createOption = (dimensionId, index, text) => ({
  type: SET_OPTION,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const updateOption = (dimensionId, index, text) => ({
  type: SET_OPTION,
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

