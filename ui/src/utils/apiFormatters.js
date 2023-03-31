/**
 * 
 * @param {*} method 
 * @param {*} prompt 
 * @param {*} maxTokens 
 * @returns 
 */
export const formatOpenAiApiRequest = (method, prompt, maxTokens) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    prompt,
    max_tokens: maxTokens || 50
  })
})