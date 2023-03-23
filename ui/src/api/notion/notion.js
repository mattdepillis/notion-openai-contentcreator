export const fetchNotionData = async () =>
  await fetch(process.env.REACT_APP_API_URL + "/notion/roots", { method: 'GET' })
    .then(d => d.json())

export const fetchChildren = async (id) =>
  await fetch(process.env.REACT_APP_API_URL + `/notion/${id}/children`, { method: 'GET' })
    .then(d => d.json())
    .then(d => { console.log("children", d); return d; })

/**
 * 
 * @param {string} blockId 
 * @returns 
 */
export const fetchBlock = async (blockId) =>
  await fetch(process.env.REACT_APP_API_URL + `/notion/block/${blockId}`, { method: 'GET' })
    .then(d => d.json())

/**
 * 
 * @returns 
 */
export const fetchUsers = async () =>
  await fetch(process.env.REACT_APP_API_URL + `/notion/users`, { method: 'GET' })
    .then(d => d.json())

/**
 * 
 * @param {*} node 
 * @param {*} callback 
 * @returns 
 */
export const fetchNode = (node, setTree, blockMap, setMap) =>
  fetch(process.env.REACT_APP_API_URL + `/notion/tree/${node.type}/${node.id}`, { method: 'GET' })
    .then(d => d.json())
    .then(node => {
      const cleaned = { ...node }
      cleaned.children = node.children.map(child => child.id)

      setTree(prev => ({
        ...prev,
        [node.id]: cleaned
      }))

      setMap(prev => ({
        ...prev,
        [node.title]: node.id
      }))
      
      node.children.forEach(child => fetchNode(child, setTree, blockMap, setMap))
    })