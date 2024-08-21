const Label = (props) => {
    const {name, htmlFor} = props
    return (
        <label className='block text-slate-700 text-sm font-bold mb-2' htmlFor={name}>{name}</label>
    )
}

export default Label;