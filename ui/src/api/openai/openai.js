import { formatOpenAiApiRequest } from "../../utils/apiFormatters"

/**
 * 
 * @param {*} inputText 
 * @returns 
 */
export const promptDaVinci = async (inputText) =>
  fetch(process.env.REACT_APP_OPENAI_COMPLETIONS_URL, formatOpenAiApiRequest('POST', inputText))
    .then(response => response.json())
    // .then(data => data.choices[0].text)
    .catch(err => console.log(
      `Error fetching and returning OpenAI request. Input: ${inputText}, Error: ${err}`
    ))