import { combineReducers } from 'redux';
import {
  LOAD_VALUES,
  LOAD_VALUES_SUCCESS,
  LOAD_VALUES_FAILED,
  SET_NETWORKING,
  SET_STORAGE_AVAILABLE,
  SET_DATE,
  APP_LOADING,
} from '../constants/actions';
import dimensions, * as fromDimensions from './dimensions'

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


export default combineReducers({
  app,
  home,
  dimensions
})

export const getValue = (state, uid, date) => 
  state.dimensions[uid] && 
  state.dimensions[uid].values &&
  state.dimensions[uid].values[date] ? 
    state.dimensions[uid].values[date] :
    false

export const getValues = (state, uid) => state.dimensions[uid].values
export const getDimensions = state => Object.keys(state.dimensions)

export const getDate = state => state.home.date
export const getDimensionScale = (state, dimensionId) =>
  state.dimensions[dimensionId] && 
  state.dimensions[dimensionId].scale ?
    state.dimensions[dimensionId].scale : {}

export const getStorageAvailability = state => state.app.storage
export const getNetworkAvailability = state => state.app.networking