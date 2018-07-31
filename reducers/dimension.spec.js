import dimensions from './dimensions'
import * as actions from '../constants/actions'

describe("dimensions reducer", () => {

  describe("handle dimension", () => {

    const dimension1 = {
      uid: '1',
      label: 'Label of a tested dimension'
    }

    it('should handle initial state', () => {

      expect(dimensions(undefined, {})).toEqual([])
    
    })

    it('should handle ADD_DIMENSION', () => {

      const state = []
      const action = {
        type: actions.ADD_DIMENSION_SUCCESS,
        payload: dimension1 
      }
      
      expect(dimensions(state, action)).toEqual([dimension1])

    })

    it('should handle REMOVE_DIMENSION', () => {
      
      const state = [dimension1]
      const action = {
        type: actions.REMOVE_DIMENSION_SUCCESS,
        payload: { uid : dimension1.uid }
      }
      
      expect(dimensions(state, action)).toEqual([])

    })

    it('should handle UPDATE_DIMENSION', () => {

      const state = [dimension1]
      const updated = {
        ...dimension1,
        label: "Label of a modified dimension"
      }
      const action = {
        type: actions.UPDATE_DIMENSION_SUCCESS,
        payload : updated
      }
      
      expect(dimensions(state, action)).toEqual([updated])
    
    })
  })

  describe('handle dimension options', () => {

    const dimension = {
      uid: '1',
      label: 'Label of a tested dimension'
    }
    const option1 = {
      index: 1,
      text : "This is my very first option."
    }
    const option2 = {
      index : 2,
      text : "This is my second option."
    }

    it('should handle ADD_DIMENSION_OPTION for a first option', () => {
      const state = [dimension]
      const action = {
        type: actions.ADD_DIMENSION_OPTION_SUCCESS,
        payload : {
          uid: '1',
          option : option1
        }
      }
      expect(dimensions(state, action))
        .toEqual([{ ...dimension, options: [option1] }])
    })

    it('should handle ADD_DIMENSION_OPTION for a second option', () => {
      const state = [{ ...dimension, options: [option1]}]
      const action = {
        type: actions.ADD_DIMENSION_OPTION_SUCCESS,
        payload : {
          uid: '1',
          option : option2
        }
      }
      expect(dimensions(state, action))
        .toEqual([{...dimension, options: [option1, option2]}])
    })

    it('should handle UPDATE_DIMENSION_OPTION', () => {
      const state = [{ ...dimension, options: [option1] }]
      const updated = {
        index: 1,
        text: "Updated option text"
      }
      const action = {
        type: actions.UPDATE_DIMENSION_OPTION_SUCCESS,
        payload: {
          uid: '1',
          option: updated
        }
      }
      expect(dimensions(state, action))
        .toEqual([{ ...dimension, options: [updated ]}])
    })

    it('should handle REMOVE_DIMENSION_OPTION', () => {
      const state = [{ ...dimension, options: [option1] }]
      const action = {
        type: actions.REMOVE_DIMENSION_OPTION_SUCCESS,
        payload: {
          uid: '1',
          option : {
            index: 1
          }
        }
      }
      expect(dimensions(state, action))
        .toEqual([{ ...dimension, options : [] }])
    })
  })

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
        type: actions.SET_VALUE_SUCCESS,
        payload: {
          uid: '1',
          value : value1
        }
      }
      const state = [dimension]
      
      expect(dimensions(state, action))
      .toEqual([{ ...dimension, values : { ...value1 } }])
    
    })

    it('should handle REMOVE_VALUE', () => {

      const value1 = {
        '20180701' : 4
      }
      const action = {
        type: actions.REMOVE_VALUE_SUCCESS,
        payload: {
          uid: '1',
          value: value1
        }
      }
      const state = [{ ...dimension, values : { ...value1 } }]
      expect(dimensions(state, action))
        .toEqual([{ ...dimension, values : {} }])
    })

    it('should handle LOAD_VALUES', () => {
      const value1 = { '20180701' : 4 }
      const value2 = { '20180702' : 5 }
      const value3 = { '20180703' : 6 }
      const values = [value1, value2, value3 ]
      const action = {
        type: actions.LOAD_VALUES_SUCCESS,
        payload: {
          uid: '1',
          values
        }
      }
      const state = [dimension ]
      expect(dimensions(state, action))
        .toEqual([{ ...dimension, values }])
    })
    
  })
})