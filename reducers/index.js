import { combineReducers } from 'redux';
import {
  LOAD_DIMENSIONS_SUCCESS,
  ADD_DIMENSION,
  SET_VALUE_SUCCESS,
  LOAD_VALUES,
  LOAD_VALUES_SUCCESS,
  LOAD_VALUES_FAILED,
  SET_NETWORKING,
  SET_STORAGE_AVAILABLE,
  SET_DATE,
  APP_LOADING,
} from '../constants/actions';

import moment from 'moment/min/moment-with-locales';
moment.locale('fr');

const initialApp = {
  loading : false,
  networking: false,
  storage : false
}

const app = (state = initialApp, action) => {
  switch(action.type) {

    case APP_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case LOAD_VALUES :
      return {
        ...state,
        loading: true
      }

    case LOAD_VALUES_SUCCESS:
    case LOAD_VALUES_FAILED:
      return {
        ...state,
        loading: false
      }

    case SET_NETWORKING :
      return {
        ...state,
        networking: action.payload
      }

    case SET_STORAGE_AVAILABLE :
      return {
        ...state,
        storage: action.payload
      }

    default:
      return state
  }
}

const home = (state = { date : moment().format('YYYYMMDD') }, action) => {
  switch(action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload
      }
    default:
      return state
  }
}

const dimensions = (state = {}, action) => {
  
  switch(action.type) {

    case LOAD_DIMENSIONS_SUCCESS:
      const dimensions = action.payload
      const newState = {}
      dimensions.forEach(dimension => newState[dimension] = {})
      return newState
  
    case ADD_DIMENSION:
      return {
        ...state,
        [action.payload] : {}
      };

    case SET_VALUE_SUCCESS:
      const { date, value } = action.payload
      return {
        ...state,
        [action.payload.uid] : {
          ...state[action.payload.uid],
          [date] : value
        }
      }

    case LOAD_VALUES_SUCCESS:
      const { values } = action.payload
      return {
        ...state,
        [action.payload.uid] : values 
      }

    default:  
      return state;
  }
}


export default combineReducers({
  app,
  home,
  dimensions
})

export const getValue = (state, uid, date) => 
  state.dimensions[uid] && state.dimensions[uid][date] ? 
    state.dimensions[uid][date] :
    false

export const getValues = (state, uid) => state.dimensions[uid]
export const getDimensions = state => {
  return Object.keys(state.dimensions)
}
export const getDate = state => state.home.date

export const getStorageAvailability = state => state.app.storage
export const getNetworkAvailability = state => state.app.networking