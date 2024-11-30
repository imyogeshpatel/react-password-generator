import {useCallback, useState, useEffect, useRef} from 'react'
import { FaCopy } from "react-icons/fa";


const App = () => {
  
  const [length, setLength] = useState(8)
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false)
  const [isCharsAllowed, setIsCharsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNumbersAllowed) str += "0123456789"
    if (isCharsAllowed) str += "=+-_[]{}!@#$%^&*()"
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, isNumbersAllowed, isCharsAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert('password copied')
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, isCharsAllowed, isNumbersAllowed, passwordGenerator])

  return (

  <div className='bg-[#283618] w-full h-screen flex justify-center items-center'>

    <div className='w-full max-w-2xl min-w rounded-lg p-4 m text-[#fefae0] bg-[#212c14] text-lg '>
        
          <h1 className='text-center text-2xl font-bold text-[#fefae0]'>Password Generator</h1>

          <div className='py-3 px-2 mt-4 flex'>

            <input 
              ref={passwordRef}
              value={password}
              placeholder='Password'
              readOnly
              className='text-[#212c14] bg-[#fefae0] outline-none py-1 px-1 rounded-l-md flex-grow'
              type="text" 
            />

            <button 
              onClick={copyPasswordToClipboard}
              className='bg-blue-600 hover:bg-blue-700 px-3 rounded-r-md py-1 flex items-center gap-2 '>
              Copy 
              <FaCopy />
            </button>

          </div>

          <div className='flex gap-5 place-content-between flex-wrap'>

            <div>
              <input 
                onChange={(e)=>{setLength(e.target.value)}}
                className='cursor-pointer'
                value={length}
                max={50}
                min={8}
                type="range" />

              <label className='ml-2'>
                Length: {length}
              </label>
            </div>

            <div>
              
              <input 
                defaultChecked={isNumbersAllowed}
                value={isNumbersAllowed}
                onChange={()=>{setIsNumbersAllowed(!isNumbersAllowed)}}
                type="checkbox" 
                id="numberInput" />

              <label className='ml-2'>
                Numbers
              </label>
            </div>

            <div>
              
              <input 
                defaultChecked={isCharsAllowed}
                value={isCharsAllowed}
                onChange={()=>{setIsCharsAllowed(!isCharsAllowed)}}
                type="checkbox" 
                id="charInput" 
              />

              <label className='ml-2'>
                Characters
              </label>

            </div>

          </div>
   
    </div>

  </div>
  
  )
}

export default App