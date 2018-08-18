export default migration0 = state => {

  const allDimensionIds = state.dimensions.map(d => d.uid)
  const dimensionById = {}
  const valueByDimDate = {}
  const optionByDimIdx = {}

  // Iterate over dimensions.
  state.dimensions.forEach(dim => {

    // Handling dimensions
    dimensionById[dim.uid] = {
      label: dim.label,
      type: 1 // Only ORDINAL variable type for the -1 version.
    }

    // Handling values
    valueByDimDate[dim.uid] = dim.values

    // Handling options
    const newOptions = {}
    dim.options.map(o => newOptions[o.index] = {
      index: o.index,
      text: o.text,
      edit: false // Should have beed striped away.
    })
    optionByDimIdx[dim.uid] = newOptions
  })


  // Reconcile to new state tree.
  const newDimensions = {
    byId : dimensionById,
    allIds: allDimensionIds
  }

  const newOptions = {
    byDimIdx : optionByDimIdx,
    edit : { dimensionId : null, index: null }
  }

  const newValues = {
    byDimDate : valueByDimDate
  }

  // Return new state.
  const newState = {
    app: { ... state.app },
    // Only date.
    home: { ...state.home },
    dimension: newDimensions,
    options: newOptions,
    values: newValues
  }
  return Promise.resolve(newState)
}
