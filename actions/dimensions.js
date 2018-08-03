import { 
  getDimensions,
} from '../services/Provider';
import {
  ADD_DIMENSION,
  SET_VALUE_SUCCESS,
  LOAD_DIMENSIONS,
  LOAD_DIMENSIONS_SUCCESS,
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

export const saveValue = (uid, date, value) => ({
    type: SET_VALUE_SUCCESS,
    payload: { uid, date, value }
});