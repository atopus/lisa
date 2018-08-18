import reducer from './dimensions'
import * as actions from '../constants'

describe('reducer', () => {

  describe("dimensions reducer", () => {

      const dimension1 = {
        uid: '1',
        label: 'Label of the first dimension'
      }
      const dimension2 = {
        uid: '2',
        label: 'Label of the second dimension'
      }
      const dimension3 = {
        uid: '3',
        label: 'Label of the third dimension'
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

      it('should handle SORT_DIMENSION', () => {

        const state = {
          byId: { 
            [dimension1.uid] : dimension1,
            [dimension2.uid] : dimension2,
            [dimension3.uid] : dimension3,
          },
          allIds: [dimension1.uid, dimension2.uid, dimension3.uid]
        }

        const action = {
          type: actions.SORT_DIMENSIONS,
          payload: [dimension1.uid, dimension3.uid, dimension2.uid]
        }

        const result = reducer(state, action)
        expect(result.allIds)
          .toEqual([dimension1.uid, dimension3.uid, dimension2.uid])
      })
    })
  })