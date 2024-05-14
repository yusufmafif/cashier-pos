import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export const ItemsList = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        const response = await axios.get(import.meta.env.VITE_SERVER + '/products')
        setItems(response.data)
    }

    const deleteProduct = async (id) => {
        await axios.delete(import.meta.env.VITE_SERVER + `/products/${id}`)
        getItems()
    }

    // function formatBirthDate(originalDate) {
    //     const [year, month, day] = originalDate.slice(0, 10).split('-');
    //     const formattedDate = `${day}-${month}-${year}`;
    //     return formattedDate;
    //   }


    return (
        <div>
            <h1 className="title">Items</h1>
            <h2 className="subtitle">List of Items</h2>
            <Link to="/items/add" className="button is-primary mb-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Barcode Item</th>
                        <th>Nama Item</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <th>{index + 1}</th>
                            <th>{item.itemBarcode}</th>
                            <th>{item.name}</th>
                            <th>{item.unit}</th>
                            <th>Rp.{item.price}</th>
                            <th>{item.categoryName}</th>
                            <th>
                                <Link to={`/product/edit/${item.id}`} className="button is-small is-info mr-1">Edit</Link>
                                <button onClick={() => { deleteProduct(item.id) }} className="button is-small is-danger">Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
