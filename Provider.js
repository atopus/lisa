import { AsyncStorage } from 'react-native';
import DATA from './fixtures/data';

export const getData = key => DATA[key];
export const getDimensions = () => Object.keys(DATA);

export const getValues = async (id) => {
  try {
    const values = await AsyncStorage.getItem(`@lisa-${id}`)
    if(values !== null) {
      return parseInt(values);
    } else {
      return false;
    }
  } catch(error) {
    throw error
  }
};

export const setValue = async (id, value) => {
  try {
    await AsyncStorage.setItem(`@lisa-${id}`, JSON.stringify(value));
    return true;
  } catch(error) {
    return false;
  }
};