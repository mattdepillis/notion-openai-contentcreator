/**
 * Sets the elementMap variable in sessionStorage and in current state with the parameterized callback fn.
 * @param {*} node 
 * @param {*} callback 
 */
export const setMap = (node, callback) => {
  sessionStorage.setItem('elementMap', JSON.stringify({
    ...JSON.parse(sessionStorage.getItem('elementMap') || '{}'),
    [node.title]: node.id
  }))

  // Update elementMap in state
  callback(prev => ({
    ...prev,
    [node.title]: node.id
  }))
}