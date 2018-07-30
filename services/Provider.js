import { AsyncStorage } from 'react-native';
import DATA from './data';

const PREFIX = '@lisa';

export const getData = key => DATA[key];
export const getDimensions = () => Object.keys(DATA);

export const getValues = async (id) => {
  try {

    if(typeof id !== 'string') throw new Error("id must be a string. Received "+id);

    const rawValues = await AsyncStorage.getItem(`${PREFIX}-${id}`);
    const values = JSON.parse(rawValues);
    if(values !== null) return values;
    else return false;
    
  } catch(error) {
    console.error(error)
    return false
  }
}

/**
 * 
 * @param {string} id 
 * @param {string} date YYYYMMDD 
 */
export const getValue = async (id, date) => {

  try {

    if(typeof id !== 'string') throw new Error("id must be a string. Received "+id);
    if(typeof date !== 'string' || date.length !== 8 || isNaN(date)) throw new Error("Bad date argument. Must be a string number formated as 'YYYYMMDD'. Received "+date);
    
    const rawValues = await AsyncStorage.getItem(`${PREFIX}-${id}`);
    const values = JSON.parse(rawValues);
    if(values !== null && values[date] !== undefined) {
      return values[date];
    } else {
      return false;
    }
  } catch(error) {
    throw error
  }
};

/**
 * Create or replace a value.
 * 
 * @param {string} id 
 * @param {string} date 
 * @param {any} value 
 */
export const setValue = async (id, date, value) => {

  if(typeof id !== 'string') throw new Error("id must be a string. Received "+id);
  if(typeof date !== 'string' || date.length !== 8 || isNaN(date)) throw new Error("Bad date argument. Must be a string number formated as 'YYYYMMDD'. Received "+date);
  if(value === null || value === undefined) throw new Error("Missing value argument. Cannot be null nor undefined.")

  try {
    let oldValues = await getValues(id, date) || {} ;
    // Temp HACK : remove old Storage.
    if(typeof oldValues !== 'object') oldValues = {};
    const newValue = { ...oldValues, [date] : value }; 
    await AsyncStorage.setItem(`${PREFIX}-${id}`, JSON.stringify(newValue));
    return true;
  } catch(error) {
    console.error(error)
    return false;
  }
};

export const valueExists = async (id, date) => getValues(id, date) !== false;

const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const myKeys = keys.filter(k => k.startsWith(PREFIX) > -1)
    return myKeys
  } catch(error) {
    throw error
  } 
}

export const clearAll = async () => {
  try {
    const keys = await getAllKeys();
    await AsyncStorage.multiRemove(keys)
    return true
  } catch(error) {
    console.error(error);
    return false
  }
}