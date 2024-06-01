import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// axios.defaults.withCredentials = true;
const initialState = {
    user: null,
    name: '',
    id: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_SERVER + '/login', {
            email: user.email,
            password: user.password,
        },
            {
                credentials: 'include'
            }
        )
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const RegisterUser = createAsyncThunk('user/RegisterUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_SERVER + '/register', {
            username: user.username,
            email: user.email,
            password: user.password
        })
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_SERVER + '/me', null, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const LogOut = createAsyncThunk('user/LogOut', async () => {
    // await axios.delete(import.meta.env.VITE_SERVER + '/logout')
    state.user = false
})





export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload.token
            state.name = action.payload.name
            state.id = action.payload.id
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload.data.message
        })

        // Get User Login

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false // Menetapkan isError kembali ke false
        })

        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer