import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Label from '../Elements/Input/Label';
import Swal from '../../../node_modules/sweetalert2/src/sweetalert2.js';

const FormEditStudent = () => {
  const [barcode, setBarcode] = useState("")
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [msg, setMsg] = useState("")
  const [img, setImg] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSelectChange = (event) => {
    const value = event.target.value
    setCategory(value)
    console.log(value)
  }

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER + `/product/${id}`)
        setBarcode(response.data.itemBarcode)
        setName(response.data.name)
        setUnit(response.data.unit)
        setPrice(response.data.price)
        setCategory(response.data.categoryName)
        setImg(response.data.image)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getStudentById()
  }, [id])


  const updateItem = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(import.meta.env.VITE_SERVER + `/product/${id}`, {
        item_barcode: barcode,
        item_name: name,
        item_satuan: unit,
        item_price: Number(price),
        category: category
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

  const editItems = async (id, getTransaction) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this transaction?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_SERVER}/transaction/${id}`);
        getTransaction();
        Swal.fire('Deleted!', 'Transaction deleted successfully.', 'success');
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        Swal.fire('Error!', 'Failed to delete transaction.', 'error');
      }
    }
  };


  return (
    <div>
      <h1 className="title">Items</h1>
      <h2 className="subtitle">Update Items</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <img src={img} alt="img" className="mx-auto rounded-3xl w-1/2" />

          <form onSubmit={updateItem}>
            <p className="has-text-centered pt-3">{msg}</p>
            <InputForm label="Barcode" type="text" placeholder="Muhammad" value={barcode} ref={usernameRef} onChange={(e) => setBarcode(e.target.value)} />
            <InputForm label="Nama Item" type="text" placeholder="Muhammad" value={name} onChange={(e) => setName(e.target.value)} />
            <InputForm label="Satuan Item" type="text" placeholder="Muhammad" value={unit} onChange={(e) => setUnit(e.target.value)} />
            <InputForm label="Harga" type="text" placeholder="Muhammad" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Label text="Kategori" name="Kategori" />
            <div className='select is-fullwidth mb-5'>
              <select value={category} onChange={handleSelectChange}>
                <option value="Makanan">Makanan</option>
                <option value="Sabun">Sabun</option>
              </select>
            </div>
            <Button type="submit" name="Update" classname="bg-blue-700 w-full"></Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FormEditStudent

