/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @param {*} prefixLength 
 * @returns 
 */
const levenshteinDistance = (a, b, prefixLength = Math.min(a.length, b.length)) => {
  if (prefixLength === 0) return 0
  if (a.slice(0, prefixLength) === b.slice(0, prefixLength)) {
    return levenshteinDistance(a.slice(1), b.slice(1), prefixLength - 1)
  } else {
    const substitution = levenshteinDistance(a.slice(1), b.slice(1), prefixLength - 1)
    const insertion = levenshteinDistance(a, b.slice(1), prefixLength - 1)
    const deletion = levenshteinDistance(a.slice(1), b, prefixLength - 1)
    return Math.min(substitution, insertion, deletion) + 1
  }
}

/**
 * 
 * @param {*} obj 
 * @param {*} term 
 * @param {*} maxDistance 
 * @returns 
 */
export const filterKeysByLevenshteinDistance = (obj, term, maxDistance) => {
  const prefixLength = term.length

  return Object.keys(obj).filter(key => {
    if (key.length < prefixLength) return false
  
    const distance = levenshteinDistance(
      key.slice(0, prefixLength),
      term.slice(0, prefixLength), prefixLength
    )
    
    return distance <= maxDistance
  })
}