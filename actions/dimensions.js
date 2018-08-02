import uuidv1 from 'uuid/v1'
import { 
  getDimensions, 
  setValue, 
  getValues 
} from '../services/Provider';
import {
  ADD_DIMENSION,
  ADD_DIMENSION_SUCCESS,
  UPDATE_DIMENSION_SUCCESS,
  SET_VALUE,
  SET_VALUE_SUCCESS,
  SET_VALUE_FAILED,
  LOAD_VALUES,
  LOAD_VALUES_SUCCESS,
  LOAD_DIMENSIONS,
  LOAD_DIMENSIONS_SUCCESS,
  LOAD_DIMENSIONS_FAILED,
  ADD_DIMENSION_OPTION_SUCCESS,
  UPDATE_DIMENSION_OPTION_SUCCESS,
  REMOVE_DIMENSION_OPTION_SUCCESS
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

export const saveValue = (uid, date, value) => dispatch => {
  dispatch({ type: SET_VALUE });

  return setValue(uid, date, value)
    .then(result => {
      if(result) {
        dispatch({
          type: SET_VALUE_SUCCESS,
          payload: { 
            uid, 
            value: { [date] : value }
          }
        })
        return true
      } else {
        dispatch({
          type: SET_VALUE_FAILED
        })
        return false
      }
    })
    .catch(error => {
      dispatch({
        type: SET_VALUE_FAILED,
        payload: error
      })
    })
};

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

export const createDimension = label => ({
  type: ADD_DIMENSION_SUCCESS,
  payload: {
    uid : uuidv1(),
    label
  } 
})

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