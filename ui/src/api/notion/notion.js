export const fetchNotionData = async () =>
  await fetch(process.env.REACT_APP_API_URL + "/notion/roots", { method: 'GET' })
    .then(d => d.json())

export const fetchChildren = async (id) =>
  await fetch(process.env.REACT_APP_API_URL + `/notion/${id}/children`, { method: 'GET' })
    .then(d => d.json())
    .then(d => { console.log("children", d); return d; })

export const fetchTree = async () =>
  await fetch(process.env.REACT_APP_API_URL + "/notion/tree", { method: 'GET' })
    .then(d => d.json())

// TODO: refine this method for data fetching of tree components
export const fetchTreeNodeChildren = async (node) =>
  await fetch(process.env.REACT_APP_API_URL + `/notion/tree/children`, {
    method: 'GET',
    body: node
  })
    .then(d => d.json())