import { forwardRef } from "react";
import Label from "./Label";

const Input = forwardRef((props, ref) => {
    const { type, placeholder, name, onChange, value } = props
    return (
        <input type={type} className='text-sm border rounded w-full py-2 px-3 text-slate-700' placeholder={placeholder} id={name} ref={ref} onChange={onChange} value={value}/>
    )
})

export default Input;