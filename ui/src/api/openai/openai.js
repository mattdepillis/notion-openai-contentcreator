import { formatOpenAiApiRequest } from "../../utils/apiFormatters"

/**
 * 
 * @param {*} inputText 
 * @returns 
 */
export const promptDaVinci = async (inputText) =>
  fetch(process.env.REACT_APP_DAVINCI_URL, formatOpenAiApiRequest('POST', inputText))
    .then(response => response.json())