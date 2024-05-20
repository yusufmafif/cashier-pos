import React, { useEffect } from 'react'
import Layout from './Layout'
import Welcome from '../components/Fragments/Welcome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'
import axios from 'axios'

export const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER + "/me", {
            withCredentials: true
        })
            .then((response) => {
                navigate("/dashboard")
            })
            .catch((error) => {
                console.log(error)
                navigate("/")
            })

    }, []);

    return (
        <Layout>
            <Welcome />
        </Layout>
    )
}

export default Dashboard