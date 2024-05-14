import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "bulma/css/bulma.css"
import Dashboard from './pages/Dashboard.jsx'
import Users from './pages/Users.jsx'
import LoginPage from './components/pages/Login.jsx'
import RegisterPage from './components/pages/Register.jsx'
import Students  from './pages/Students.jsx'
import AddUser from './pages/AddUser.jsx'
import EditUser from './pages/EditUser.jsx'
import EditItem from './pages/EditItem.jsx'
import AddItems from './pages/AddItems.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './components/app/store.js'
import Transactions from './pages/Transactions.jsx'
import TransactionDetail from './pages/TransactionDetail.jsx'


axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/users",
    element: <Users/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/items",
    element: <Students/>
  },
  {
    path: "users/add",
    element: <AddUser/>
  },
  {
    path: "users/edit/:id",
    element: <EditUser/>
  },
  {
    path: "items/add",
    element: <AddItems/>
  },
  {
    path: "product/edit/:id",
    element: <EditItem/>
  },
  {
    path: "/transactionslist",
    element: <Transactions/>
  },
  {
    path: "/transaction/:id",
    element: <TransactionDetail/>
  }
])
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
