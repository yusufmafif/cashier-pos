import { useRef, useEffect, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input/index"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../../features/authSlice";
import axios from 'axios';
import Cookies from 'js-cookie';


const FormLogin = () => {
    const [email, setEmail] = useState('afif@gmail.com');
    const [password, setPassword] = useState('abuya313');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    const token = Cookies.get("token");
    useEffect(() => {
        if (user || isSuccess) {
            axios.post(import.meta.env.VITE_SERVER + "/me", null, {
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(response => {
                    setRole(response.data.userData.role); // Menyimpan peran pengguna di state
                    navigate("/dashboard")
                })
                .catch(error => {
                    console.error(error.response.data);
                });

        }
        dispatch(reset())
    }, [user, isSuccess, dispatch, navigate])

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);


    const Auth = async (e) => {
        e.preventDefault()
        dispatch(LoginUser({ email, password }))
    }

    return (
        <form onSubmit={Auth}>
            {isError && <p className="has-text-centered">{message}</p>}
            <InputForm
                label="Email"
                type="email"
                placeholder="afif.yusuf@gmail.com"
                name="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)} />

            <InputForm
                label="Password"
                type="password"
                placeholder="*******"
                name="password"
                onChange={(e) => setPassword(e.target.value)} />

            <Button name={isLoading ? "Loading..." : "Login"} classname="bg-blue-700 w-full" type="submit"></Button>
        </form>
    )
}

export default FormLogin;
