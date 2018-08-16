import reducer from './dimensions'
import * as actions from '../constants'

describe('reducer', () => {

  describe("dimensions reducer", () => {

      const dimension1 = {
        uid: '1',
        label: 'Label of a tested dimension'
      }

      it('should handle initial state', () => {

        const result = reducer(undefined, {})
        expect(result.byId).toEqual({})
        expect(result.allIds).toEqual([])
      
      })

      it('should handle ADD_DIMENSION', () => {

        const state = []
        const action = {
          type: actions.CREATE_DIMENSION,
          payload: dimension1 
        }
        
        const result = reducer(state, action)
        expect(result.byId).toMatchObject({ [dimension1.uid] : dimension1 })
        expect(result.allIds).toEqual([dimension1.uid])

      })

      it('should handle REMOVE_DIMENSION', () => {
        
        const state = [dimension1]
        const action = {
          type: actions.DELETE_DIMENSION,
          payload: { uid : dimension1.uid }
        }
        
        const result = reducer(state, action)
        expect(result.byId).toEqual({})
        expect(result.allIds).toEqual([])

      })

      it('should handle UPDATE_DIMENSION', () => {

        const state = [dimension1]
        const updated = {
          ...dimension1,
          label: "Label of a modified dimension"
        }
        const action = {
          type: actions.UPDATE_DIMENSION,
          payload : updated
        }
        
        const result = reducer(state, action)
        expect(result.byId).toEqual({[dimension1.uid] : updated })
        // expect(result.allIds).toEqual([dimension1.uid])
      
      })

    //   it('should handle LOAD_DIMENSIONS', () => {

    //     const state = []
    //     const d1 = {
    //       uid: '1',
    //       label: 'Dimension 1'
    //     }
    //     const d2 = {
    //       uid: '2',
    //       label: 'Dimension 2'
    //     }
    //     const d3 = {
    //       uid: '3',
    //       label: 'Dimension 3'
    //     }
    //     const action = {
    //       type: actions.LOAD_DIMENSIONS,
    //       payload: [d1, d2, d3]
    //     }

    //     const result = reducer(state, action)
    //     expect(result.byId).toEqual({
    //       [d1.uid] : d1, 
    //       [d2.uid] : d2, 
    //       [d3.uid] : d3
    //     })
    //     expect(result.allIds).toEqual([d1.uid, d2.uid, d3.uid])
      // })
    })
  })