import { formatOpenAiApiRequest } from "../../utils/apiFormatters"

/**
 * 
 * @param {*} inputText 
 * @returns 
 */
export const promptDaVinci = async (inputText) =>
  fetch('https://api.openai.com/v1/completions', formatOpenAiApiRequest('POST', inputText))
    .then(response => response.json())