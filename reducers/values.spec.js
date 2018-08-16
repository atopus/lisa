import * as fromReducer from './dimensions'
import * as actions from '../constants'

describe('reducer', () => {
  describe('handle dimension values', () => {

    const dimension = {
      uid: '1',
      label: 'Label of a tested dimension'
    }

    it('should handle SET_VALUE', () => {
      
      const value1 = {
        '20180701' : 4
      }
      const action = {
        type: actions.SET_VALUE,
        payload: {
          uid: '1',
          value : value1
        }
      }
      const state = [dimension]
      
      expect(fromReducer.dimensions(state, action))
      .toEqual([{ ...dimension, values : { ...value1 } }])
    
    })

    it('should handle REMOVE_VALUE', () => {

      const value1 = {
        '20180701' : 4
      }
      const action = {
        type: actions.REMOVE_VALUE,
        payload: {
          uid: '1',
          value: value1
        }
      }
      const state = [{ ...dimension, values : { ...value1 } }]
      expect(fromReducer.dimensions(state, action))
        .toEqual([{ ...dimension, values : {} }])
    })

    it('should handle LOAD_VALUES', () => {
      const value1 = { '20180701' : 4 }
      const value2 = { '20180702' : 5 }
      const value3 = { '20180703' : 6 }
      const values = [value1, value2, value3 ]
      const action = {
        type: actions.LOAD_VALUES,
        payload: {
          uid: '1',
          values
        }
      }
      const state = [dimension ]
      expect(fromReducer.dimensions(state, action))
        .toEqual([{ ...dimension, values }])
    })
  })
})