import { setMap } from "../../utils/notionApiHelpers"



/**
 * 
 * @returns 
 */
export const fetchNotionData = async () =>
  await fetch(process.env.REACT_APP_API_URL + "/notion/roots", { method: 'GET' })
    .then(d => d.json())

/**
 * 
 * @param {*} id 
 * @returns 
 */
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
export const fetchNode = (node, setTree, setElementMap) =>
  fetch(process.env.REACT_APP_API_URL + `/notion/tree/${node.type}/${node.id}`, { method: 'GET' })
    .then(d => d.json())
    .then(node => {
      const cleaned = { ...node }
      cleaned.children = node.children.map(child => child.id)

      setTree(prev => {
        /*
          NOTE: this was the only way I could successfully set both elementMap and notionTree at once.
          Calling setElementMap() directly here had some odd state effects,
          including preventing the passdown of previous tree state to future fetchNode() calls.
        */
        setMap(node, setElementMap)

        const newTree = { ...prev, [node.id]: cleaned }
        sessionStorage.setItem('tree', JSON.stringify(newTree))
        return newTree
      })
      
      node.children.forEach(child => fetchNode(child, setTree, setElementMap))
    })