import React, { useState, useEffect } from 'react'
import Layout from '../../pages/Layout'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'

export const Transactionslist = () => {
    const [trans, setTrans] = useState([])



function convertDate(date) {
    const sellDateObj = new Date(date);
    const day = sellDateObj.getDate();
    const month = sellDateObj.getMonth() + 1;
    const year = sellDateObj.getFullYear();
    const hours = sellDateObj.getHours();
    const minutes = sellDateObj.getMinutes();
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate
}

  


    useEffect(() => {
        getTransaction()
    }, [])

    const getTransaction = async () => {
        const response = await axios.get("http://localhost:5000/transaction")
        setTrans(response.data)
        console.log(response.data)
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/transaction/${id}`)
        getTransaction()
    }

    return (
        <div>
            <h1 className="title">Transactions List</h1>
            <h2 className="subtitle">List of Transactions</h2>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Waktu Penjualan</th>
                        <th>Total Harga</th>
                        <th>Pembayaran</th>
                        <th>Customer</th>
                        <th>Cashier</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trans.map((tran, index) => (
                        <tr key={tran.id}>
                            <th>{index + 1}</th>
                            <th>{convertDate(tran.sell_date)}</th>
                            <th>Rp. {tran.total_price}</th>
                            <th>{tran.payment_method}</th>
                            <th>{tran.customer}</th>
                            <th>{tran.user_id}</th>
                            <th>
                                <Link to={`/transaction/${tran.id}`} className="button is-small is-info mr-1">Detail</Link>
                                <button onClick={() => { deleteUser(tran.id) }} className="button is-small is-danger">Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transactionslist
