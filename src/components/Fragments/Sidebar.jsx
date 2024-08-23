import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { IoPerson, IoHome, IoLogOut, IoGift } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoMenu } from "react-icons/io5"

export const Sidebar = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const token = Cookies.get("token");
    useEffect(() => {
        axios.post(import.meta.env.VITE_SERVER + "/me", null, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(response => {
                setRole(response.data.userData.role); // Menyimpan peran pengguna di state
            })
            .catch(error => {
                console.error(error.response.data);
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
                <aside className="is-hidden-mobile ml-2 mt-2">
                    <p className="menu-label">
                        General
                    </p>
                    <ul className="menu-list" >
                        <li>
                            <NavLink to={"/dashboard"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoHome />Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/items"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoGift />Items</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/transactionslist"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><FaMoneyBillWaveAlt />Transactions list</NavLink>
                        </li>
                    </ul>

                    {role === "admin" && <div>
                        <p className="menu-label">
                            Admin
                        </p>
                        <ul className="menu-list">
                            <li><NavLink to={"/users"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoPerson />User</NavLink></li>
                        </ul>
                    </div>}
                    <p className="menu-label">
                        Settings
                    </p>
                    <ul className="menu-list">
                        <li><button onClick={logout} className='button is-white' style={{ display: 'flex', alignItems: 'center', gap: '2%',marginLeft: '-10px' }}><IoLogOut />Log out</button></li>
                    </ul>
                </aside>

            <button className="burger-button" onClick={toggleMenu}>
                <IoMenu size={24} />
            </button>
            
            <aside className={`menu has-shadow pl-2 ${menuActive ? 'is-active' : ''}`}>
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li>
                        <NavLink to={"/dashboard"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoHome />Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/items"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoGift />Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/transactionslist"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><FaMoneyBillWaveAlt />Transactions list</NavLink>
                    </li>
                </ul>

                {role === "admin" && (
                    <div>
                        <p className="menu-label">Admin</p>
                        <ul className="menu-list">
                            <li><NavLink to={"/users"} style={{ display: 'flex', alignItems: 'center', gap: '2%' }} className={({ isActive }) => isActive ? 'is-active' : ''}><IoPerson />User</NavLink></li>
                        </ul>
                    </div>
                )}

                <p className="menu-label">Settings</p>
                <ul className="menu-list">
                    <li><button onClick={logout} className='button is-white' style={{ display: 'flex', alignItems: 'center', gap: '2%', marginLeft: '-10px' }}><IoLogOut />Log out</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar