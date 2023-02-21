export const fetchNotionData = async () =>
  await fetch(process.env.REACT_APP_API_URL + "/notion/roots", { method: 'GET' })
    .then(d => d.json())