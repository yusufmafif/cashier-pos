import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("user")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const saveUser = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return setMsg("Password and Confirm Password do not match")

    try {
      await axios.post('https://belajarexpress.vercel.app' + "/register", {
        username: name,
        email: email,
        password: password,
        // role: role
      })
      navigate('/users')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const handleSelectChange = (event) => {
    const value = event.target.value
    setRole(value)
  }

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <h1>{msg}</h1>
          <form onSubmit={saveUser}>
            <InputForm label="Name" type="text" placeholder="Muhammad" name="Full Name" ref={usernameRef} value={name} onChange={(e) => setName(e.target.value)} />
            <InputForm label="Email" type="email" placeholder="example@mail.com" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputForm label="Password" type="password" placeholder="*******" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputForm label="Confirm Password" type="password" placeholder="*******" name="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className='field'>
              <label className='label'>Role</label>
              <div className='control'>
                <div className='select is-fullwidth'>
                  <select value={role} onChange={handleSelectChange}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
            <Button type="submit" name="Save" classname="bg-blue-700 w-full"></Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FormAddUser
