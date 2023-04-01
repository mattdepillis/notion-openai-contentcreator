import { useEffect, useState } from 'react'

import { promptDaVinci } from '../api/openai/openai'

import { formatOpenAiApiRequest } from '../utils/apiFormatters'

const OpenAIContainer = ({ setElementMap }) => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const getResult = async () => {
      const r = await promptDaVinci("Write a Hello-World function in C++ and return it formatted in a code block")
      setResult(r)
    }
    getResult()
  }, [])
  useEffect(() => console.log("result", result, process.env.REACT_APP_DAVINCI_PATH, formatOpenAiApiRequest('POST', 'hello openai!')), [result])

  return (
    <div>
      <h1>OpenAI API Prompt Result:</h1>
      {/* {result && <p>{result}</p>} */}
    </div>
  )
}

export default OpenAIContainer