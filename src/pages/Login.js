import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({login}) => {

  const formRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    // prevent default stops reload of form
    e.preventDefault()
    // store the form entries in a variable
    const formData = new FormData(formRef.current)
    // create an object from the entries
    const data = Object.fromEntries(formData)
    // store user info in format for JWT
    const userInfo = {
      "user": {email: data.email, password: data.password}
    }
    login(userInfo)
    navigate("/")
    e.target.reset()
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="ex@example.com"/>
        Password: <input type="password" name="password" placeholder='password'/>
        <input type='submit' value="Submit" />
      </form>
    </>
  )
}

export default Login