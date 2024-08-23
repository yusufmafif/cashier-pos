import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Welcome from '../components/Fragments/Welcome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = Cookies.get("token")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        if (!token) {
            return navigate("/")
        }
        axios.post(import.meta.env.VITE_SERVER + "/me", null, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                navigate("/dashboard")
                setIsAuthenticated(true)
            })
            .catch((error) => {
                console.log(error)
                navigate("/")
            })
            .finally(() => setLoading(false));

    }, []);
    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    return (
        <Layout>
            {isAuthenticated && <Welcome />}
        </Layout>
    )
}

export default Dashboard