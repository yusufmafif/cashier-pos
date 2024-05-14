import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoOptions } from "react-icons/io5"
import Label from '../Elements/Input/Label';

const FormAddItem = () => {
  const [barcode, setBarcode] = useState("")
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState()
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("Makanan")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()


  const saveItem = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://belajarexpress.vercel.app' + '/item', {
        itemBarcode: barcode,
        name: name,
        unit: unit,
        price: Number(price),
        description: description,
        image: image,
        categoryName: category
      })
      navigate('/items')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const handleSelectChange = (event) => {
    const value = event.target.value
    setCategory(value)
  }

  return (
    <div>
      <h1 className="title">Items</h1>
      <h2 className="subtitle">Add New Item</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <form onSubmit={saveItem}>
            <p className="has-text-centered">{msg}</p>
            <InputForm label="Barcode" type="text" placeholder="3131837638" name="Barcode" ref={usernameRef} value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            <InputForm label="Nama Item" type="text" placeholder="Ummu Khadijah Soap" name="Nama Item" value={name} onChange={(e) => setName(e.target.value)} />
            <InputForm label="Satuan" type="text" placeholder="pcs" name="Satuan" value={unit} onChange={(e) => setUnit(e.target.value)} />
            <InputForm label="Harga" type="text" placeholder="50000" name="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
            <InputForm label="Deskripsi" type="text" placeholder="Catatan" name="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
            <InputForm label="Gambar" type="text" placeholder="Link" name="Gambar" value={image} onChange={(e) => setImage(e.target.value)} />
            <Label text="Kategori" name="Kategori" />



            <div className='select is-fullwidth mb-5'>
              <select value={category} onChange={handleSelectChange}>
                <option value="Makanan">Makanan</option>
                <option value="Sabun">Sabun</option>
              </select>
            </div>
            <Button type="submit" name="Save" classname="bg-blue-700 w-full"></Button>
          </form>









        </div>
      </div>
    </div>
  )
}

export default FormAddItem
