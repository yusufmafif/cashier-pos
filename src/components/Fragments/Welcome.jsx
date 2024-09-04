import React from 'react'
import { useSelector } from "react-redux";
import Cashier from './Cashier';

export const Welcome = () => {
  // const { user, token } = useSelector((state) => state.auth)
  const name = localStorage.getItem('name')

  return (
    <div >
      <h1 className="title ml-4">Dashboard</h1>
      <h2 className="subtitle ml-4">Welcome Back <strong>{name}</strong></h2>
      <Cashier/>
    </div>
  )
}

export default Welcome