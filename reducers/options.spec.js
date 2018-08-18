import reducer from './options'
import * as actions from '../constants'

describe('reducer', () => {
  describe('handle dimension options', () => {

    const option1 = {
      index: 1,
      text : "This is my very first option."
    }
    const option2 = {
      index : 2,
      text : "This is my second option."
    }

    it('should handle ADD_DIMENSION_OPTION for a first option', () => {
      const state = {}
      const action = {
        type: actions.SET_OPTION,
        payload : {
          uid: '1',
          option : option1
        }
      }

      const result = reducer(state, action)
      expect(result.byDimIdx)
        .toMatchObject({ '1' : { [option1.index] : option1.text }})
    })

    it('should handle ADD_DIMENSION_OPTION for a second option', () => {
      const state = { '1' : { [option1] : option1 } }
      const action = {
        type: actions.ADD_DIMENSION_OPTION,
        payload : {
          uid: '1',
          option : option2
        }
      }
      const result = reducer(state, action)
      expect(result.byDimIdx)
        .toMatchObject({ '1' : {
          [option1.index]: option1.text,
          [option2.index]: option2.text
        }})
    })

    it('should handle UPDATE_DIMENSION_OPTION', () => {
      const state = { '1' : { [option1] : option1 }  }
      const updated = {
        index: 1,
        text: "Updated option text"
      }
      const action = {
        type: actions.SET_OPTION,
        payload: {
          uid: '1',
          option: updated
        }
      }

      const result = reducer(state, action)
      expect(result.byDimIdx)
        .toMatchObject({ '1' : { [option1.index]: updated.text } })
    })

    it('should handle REMOVE_DIMENSION_OPTION', () => {
      const state = { '1' : { [option1] : option1 }  }
      const action = {
        type: actions.DELETE_OPTION,
        payload: {
          uid: '1',
          option : {
            index: 1
          }
        }
      }

      const result = reducer(state, action)
      expect(result.byDimIdx)
        .toMatchObject({ '1' : {}})
    })

    it('should handle EDIT_DIMENSION_OPTION', () => {
      const state = {dimensionId : null, index: null }
      const action = {
        type: actions.EDIT_OPTION,
        payload: {
          uid: '1',
          option :{
            index: 2,
            edit : true
          }
        }
      }
      const result = reducer(state, action)
      expect(result.edit)
        .toMatchObject({
          dimensionId : '1', index: 2 
        })
    })
  })
})