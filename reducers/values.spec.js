import reducer from './values'
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
      
      const result = reducer(state, action)
      expect(result.byDimDate)
      .toEqual({ '1' : value1 })
    
    })
  })
})