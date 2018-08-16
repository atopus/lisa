import {
  SET_DATE
} from '../constants';

export const setDate = date => ({
  type: SET_DATE,
  payload: date
})