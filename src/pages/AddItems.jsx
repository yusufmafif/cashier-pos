import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddItem from '../components/Fragments/FormAddItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const AddItems = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)
    
    // useEffect(() => {
    //     dispatch(getMe())
    // } , [dispatch])
    
    useEffect(() => {
        if (isError) {
            navigate("/")
        }
    } , [isError, navigate])


    return (
        <Layout>
            <FormAddItem />
        </Layout>
    )
}

export default AddItems
