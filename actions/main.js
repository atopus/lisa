import {
  SET_DATE
} from '../constants/actions';

export const setDate = date => ({
  type: SET_DATE,
  payload: date
})