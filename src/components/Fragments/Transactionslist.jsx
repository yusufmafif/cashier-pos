import React, { useState, useEffect } from 'react'
import Layout from '../../pages/Layout'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

export const Transactionslist = () => {
    const [trans, setTrans] = useState([])
    const token = Cookies.get("token")


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
        const response = await axios.get(import.meta.env.VITE_SERVER + "/transaction", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setTrans(response.data)
    }

  

    const deleteUser = async (id, getTransaction) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');
        if (isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER}/transaction/${id}`);
                getTransaction();
                alert('Transaction deleted successfully.');
            } catch (error) {
                console.error('Failed to delete transaction:', error);
                alert('Failed to delete transaction.');
            }
        }
    };

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
                        {/* <th>Customer</th> */}
                        <th>Cashier</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trans.map((tran, index) => (
                        <tr key={tran.id}>
                            <th>{index + 1}</th>
                            <th>{convertDate(tran.createdAt)}</th>
                            <th>Rp. {tran.totalPrice}</th>
                            <th>{tran.paymentMethod}</th>
                            {/* <th>{tran.customer}</th> */}
                            <th>{tran.user.username}</th>
                            <th>
                                <Link to={`/transaction/${tran.id}`} className="button is-small is-info mr-1">Detail</Link>
                                <button onClick={() => { deleteUser(tran.id, getTransaction) }} className="button is-small is-danger">Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transactionslist
