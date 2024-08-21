import React, { useEffect } from 'react'
import Layout from './Layout'
import { ItemsList } from '../components/Fragments/ItemsList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

export const Items = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   dispatch(getMe())
  // }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
  }, [isError, navigate])

  return (
    <Layout>
      <ItemsList />
    </Layout>
  )
}

export default Items