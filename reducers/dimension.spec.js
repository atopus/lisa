import dimensions from './dimensions'

describe("dimensions reducer", () => {
  it('should handle initial state', () => {
    expect(dimensions(undefined, {}))
      .toEqual({})
    
  })
})