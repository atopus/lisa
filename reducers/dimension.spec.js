import reducer, * as fromReducer from './dimensions'
import * as actions from '../constants/actions'

describe("dimensions reducer", () => {

  describe("handle dimension", () => {

    const dimension1 = {
      uid: '1',
      label: 'Label of a tested dimension'
    }

    it('should handle initial state', () => {

      expect(fromReducer.dimensions(undefined, {})).toEqual([])
    
    })

    it('should handle ADD_DIMENSION', () => {

      const state = []
      const action = {
        type: actions.ADD_DIMENSION_SUCCESS,
        payload: dimension1 
      }
      
      expect(fromReducer.dimensions(state, action)).toMatchObject([dimension1])

    })

    it('should handle REMOVE_DIMENSION', () => {
      
      const state = [dimension1]
      const action = {
        type: actions.REMOVE_DIMENSION_SUCCESS,
        payload: { uid : dimension1.uid }
      }
      
      expect(fromReducer.dimensions(state, action)).toEqual([])

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
      
      expect(fromReducer.dimensions(state, action)).toEqual([updated])
    
    })

    it('should handle LOAD_DIMENSIONS', () => {

      const state = []
      const d1 = {
        uid: '1',
        label: 'Dimension 1'
      }
      const d2 = {
        uid: '2',
        label: 'Dimension 2'
      }
      const d3 = {
        uid: '3',
        label: 'Dimension 3'
      }
      const action = {
        type: actions.LOAD_DIMENSIONS_SUCCESS,
        payload: [d1, d2, d3]
      }

      expect(fromReducer.dimensions(state, action)).toEqual([d1, d2, d3])
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
      expect(fromReducer.dimensions(state, action))
        .toMatchObject([{ ...dimension, options: [option1] }])
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
      expect(fromReducer.dimensions(state, action))
        .toMatchObject([{...dimension, options: [option1, option2]}])
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
      expect(fromReducer.dimensions(state, action))
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
      expect(fromReducer.dimensions(state, action))
        .toEqual([{ ...dimension, options : [] }])
    })

    it('should handle EDIT_DIMENSION_OPTION', () => {
      const state = [{ ...dimension, options : [option1, option2]}]
      const action = {
        type: actions.EDIT_DIMENSION_OPTION,
        payload: {
          uid: '1',
          option :{
            index: 2,
            edit : true
          }
        }
      }
      const option2edited = { ...option2, edit: true }
      expect(fromReducer.dimensions(state, action))
        .toEqual([{ ...dimension, options : [option1, option2edited ]}])
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
      
      expect(fromReducer.dimensions(state, action))
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
      expect(fromReducer.dimensions(state, action))
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
      expect(fromReducer.dimensions(state, action))
        .toEqual([{ ...dimension, values }])
    })
    
  })
})