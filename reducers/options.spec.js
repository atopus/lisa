import * as fromReducer from './dimensions'
import * as actions from '../constants'

describe('reducer', () => {
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
        type: actions.ADD_DIMENSION_OPTION,
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
        type: actions.ADD_DIMENSION_OPTION,
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
        type: actions.UPDATE_DIMENSION_OPTION,
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
        type: actions.REMOVE_DIMENSION_OPTION,
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
})