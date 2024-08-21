import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = forwardRef((props, ref) => {
    const { type, name, placeholder, label, onChange, value } = props
    return (
        <div className='mb-6'>
            <Label text={name} name={label} />
            <Input value={value} type={type} placeholder={placeholder} ref={ref} onChange={onChange} />
        </div>
    )
})

export default InputForm