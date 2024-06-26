import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import convertDate from '../Elements/convertDate';

const TransactionDetailList = () => {
  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [date, setDate] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const saveUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        password: password,
        confPassword: confirmPassword,
        role: role
      })
      navigate('/users')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }



  const getTransactionById = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER + `/transaction/${id}`)
      setData(response.data)
      setDate(response.data[0].createdAt)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }
  useEffect(() => {
    getTransactionById()
  }, [])

  const handleSelectChange = (event) => {
    const value = event.target.value
    setRole(value)
  }

  useEffect(() => {
    if (data.length > 0) {
      const totalPrice = data.reduce((a, item) => {
        return a + item.productPrice * item.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [data]);

  // const usernameRef = useRef(null)
  // useEffect(() => {
  //   usernameRef.current.focus()
  // }, [])

  return (
    <div className="p-2">
      <h1 className="title">Transaction Detail</h1>
      <h2 className="subtitle">Transaction Date: {convertDate(date)}</h2>

      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.transactionId}
                </td>
                <td>
                  {item.productName}
                </td>
                <td>
                  {item.productPrice}
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>
                  {item.subTotalPrice}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}><b>Total Price</b></td>
              <td><b>Rp {totalPrice.toLocaleString("id-ID", { styles: "currency", currency: "USD", })}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionDetailList
