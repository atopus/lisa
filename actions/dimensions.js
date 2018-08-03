import uuidv1 from 'uuid/v1'
import { 
  getDimensions,
} from '../services/Provider';
import {
  ADD_DIMENSION,
  ADD_DIMENSION_SUCCESS,
  UPDATE_DIMENSION_SUCCESS,
  SET_VALUE_SUCCESS,
  LOAD_DIMENSIONS,
  LOAD_DIMENSIONS_SUCCESS,
  LOAD_DIMENSIONS_FAILED,
  ADD_DIMENSION_OPTION_SUCCESS,
  UPDATE_DIMENSION_OPTION_SUCCESS,
  REMOVE_DIMENSION_OPTION_SUCCESS,
  EDIT_DIMENSION_OPTION
} from '../constants/actions';

export const loadDimensions = () => dispatch => {
  dispatch({ type: LOAD_DIMENSIONS });

  const dimensions = getDimensions();
  dispatch({
    type: LOAD_DIMENSIONS_SUCCESS,
    payload: dimensions
  });
};

export const loadDimension = uid => ({
  type: ADD_DIMENSION,
  payload: uid
});

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
  type: SET_VALUE_SUCCESS,
  payload: { 
    uid, 
    value: { [date] : value }
  }
});

export const loadValues = uid => dispatch => {

  dispatch({ type: LOAD_VALUES });

  return getValues(uid)
    .then(values => dispatch({
      type: LOAD_VALUES_SUCCESS,
      payload : { uid, values }
    }))
    .catch(error => dispatch({
      type: LOAD_DIMENSIONS_FAILED
    }))
};

export const createDimension = label => dispatch => {

  const uid = uuidv1()
  
  dispatch({
    type: ADD_DIMENSION_SUCCESS,
    payload: {
      uid,
      label
    }
  })

  return uid
}

export const updateDimension = (uid, label) => ({
  type: UPDATE_DIMENSION_SUCCESS,
  payload : {
    uid,
    label
  }
})

export const createDimensionOption = (dimensionId, index, text) => ({
  type: ADD_DIMENSION_OPTION_SUCCESS,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const updateDimensionOption = (dimensionId, index, text) => ({
  type: UPDATE_DIMENSION_OPTION_SUCCESS,
  payload: { 
    uid : dimensionId, 
    option : { index, text }
  }
})

export const deleteDimensionOption = (dimensionId, index) => ({
  type: REMOVE_DIMENSION_OPTION_SUCCESS,
  payload: {
    uid: dimensionId,
    option : {
      index
    }
  }
})

