export const fetchNotionData = async () => {
  console.log(process.env.REACT_APP_API_URL)
  const data = await fetch(process.env.REACT_APP_API_URL, { method: 'GET' })
  console.log('d', data)
  return data.json()
}