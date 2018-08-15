export const isNew = dimension => !dimension.uid
export const isRanking = dimension => dimension.options.length > 0
export const isRankingEnabled = dimension => dimension.options.length > 1
export const isNumeric = dimension => (
    (dimension.max !== null && dimension.max !== undefined) &&
    (dimension.min !== null && dimension.min !== undefined)
  )
export const isUnqualified = dimension => 
  !isRanking(dimension) && 
  !isNumeric(dimension)
export const isEnabled = dimension => 
  isRankingEnabled(dimension) || 
  isNumeric(dimension)