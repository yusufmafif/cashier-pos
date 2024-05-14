import React, { useEffect } from 'react'
import Layout from './Layout'
import Userlist from '../components/Fragments/Userlist'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'
import Transactionslist from '../components/Fragments/Transactionslist'

export const Transactions = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard")
    }

  }, [isError, user, navigate])

  return (
    <Layout>
      <Transactionslist />
    </Layout>
  )
}
export default Transactions
