import { useEffect, useState } from 'react'

import { promptDaVinci } from '../api/openai/openai'

const OpenAIContainer = () => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const getResult = async () => {
      // const r = await promptDaVinci("Write a Hello-World function in C++ and return it formatted in a code block")
      const r = "result"
      setResult(r)
    }
    getResult()
  }, [])
  useEffect(() => console.log("result", result), [result])

  return (
    <div>
      <h1>OpenAI API Prompt Result:</h1>
      {/* {result && <p>{result}</p>} */}
    </div>
  )
}

export default OpenAIContainer