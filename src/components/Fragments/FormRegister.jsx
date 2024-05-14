import Button from "../Elements/Button";
import InputForm from "../Elements/Input/index"
import {useRef, useEffect} from "react";
import { RegisterUser, reset } from "../../features/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const dispatch = useDispatch()
    const usernameRef = useRef(null)
    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    const register = async (e) => {
        e.preventDefault()
        dispatch(RegisterUser({ username, email, password, password2 }))
    }
    
    return (
        <form onSubmit={register}>
            <InputForm label="Fullname" type="text" placeholder="Muhammad" name="Username" ref={usernameRef} onChange={(e) => setUsername(e.target.value)}/>
            <InputForm label="Email" type="email" placeholder="example@mail.com" name="Email" onChange={(e) => setEmail(e.target.value)}/>
            <InputForm label="Password" type="password" placeholder="*******" name="Password" onChange={(e) => setPassword(e.target.value)}/>
            <InputForm label="Confirm Password" type="password" placeholder="*******" name="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
            <Button name="Register" classname="bg-blue-700 w-full" type="submit" ></Button>
        </form>
    )
}

export default FormRegister;