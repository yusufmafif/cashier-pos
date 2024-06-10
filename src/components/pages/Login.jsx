import { Provider } from "react-redux"
import AuthLayout from "../Elements/Layouts/AuthLayouts"
import FormLogin from "../Fragments/FormLogin"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getMe } from "../../features/authSlice"
import React, { useEffect } from 'react'
import axios from "axios"
import Cookies from "js-cookie";

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, name, id } = useSelector((state) => state.auth)
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { path: "/", expires: 1, secure: true, sameSite: "strict"} )
      localStorage.setItem("name", name)
      axios.post(import.meta.env.VITE_SERVER + "/me", null ,{
        headers : {
            Authorization: `${token}`
        }
     })
        .then((response) => {
          navigate("/dashboard")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [token])


  return (
    <AuthLayout title="Login" type="login">
      <FormLogin />
    </AuthLayout>

  )


}

export default LoginPage

