import moment from 'moment';
import {
  APP_LOADING,
  SET_NETWORKING,
  SET_STORAGE_AVAILABLE
} from '../constants/actions';
import {
  setValue
} from '../services/Provider';

export const appLoading = loading => ({
  type: APP_LOADING,
  payload: loading
});

export const checkNetworkAvaibility = () => dispatch =>
  fetch('http://google.com', { method: 'GET' })
    .then(result => dispatch({ 
      type: SET_NETWORKING, 
      payload: result
    }))
    .catch(error => dispatch({
        type: SET_NETWORKING,
        payload: false
    }))

export const checkStorageAvailability = () => dispatch =>
  setValue("storageTest", moment().format('YYYYMMDD'), true)
    .then(result => dispatch({
      type: SET_STORAGE_AVAILABLE,
      payload: result
    }))
    .catch(error => dispatch({
      type: SET_STORAGE_AVAILABLE,
      payload: false
      })
    );

