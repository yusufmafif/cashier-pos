import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { IoPerson, IoHome, IoLogOut, IoGift } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';

export const Sidebar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const token = Cookies.get("token");
    useEffect(() => {
        axios.post(import.meta.env.VITE_SERVER + "/me", null ,{
            headers : {
                Authorization: `${token}`
            }
         })
            .then(response => {
                setRole(response.data.userData.role); // Menyimpan peran pengguna di state
            })
            .catch(error => {
                console.error(error);
                navigate("/login");
            });
    }, [navigate]);

    const logout = () => {
        Cookies.remove("token")
        dispatch(LogOut())
        dispatch(reset())
        navigate("/")
    }
    return (
        <div>
            <aside className="menu has-shadow pl-2">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list" >
                    <li>
                        <NavLink to={"/dashboard"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }}><IoHome />Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/items"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }}><IoGift />Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/transactionslist"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }}><FaMoneyBillWaveAlt />Transactions list</NavLink>
                    </li>
                </ul>

                {role === "admin" && <div>
                    <p className="menu-label">
                        Admin
                    </p>
                    <ul className="menu-list">
                        <li><NavLink to={"/users"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }}><IoPerson />User</NavLink></li>
                    </ul>
                </div>}
                <p className="menu-label">
                    Settings
                </p>
                <ul className="menu-list">
                    <li><button onClick={logout} className='button is-white' style={{ display: 'flex', alignItems: 'center', gap: '2%' }}><IoLogOut />Log out</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar