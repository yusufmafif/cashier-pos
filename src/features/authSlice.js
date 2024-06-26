import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    user: null,
    name: '',
    id: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/login`, {
            email: user.email,
            password: user.password,
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const RegisterUser = createAsyncThunk('user/RegisterUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/register`, {
            username: user.username,
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/me`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.msg || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const LogOut = createAsyncThunk('user/LogOut', async (_, thunkAPI) => {
    try {
        await axios.delete(`${import.meta.env.VITE_SERVER}/logout`);
    } catch (error) {
        const message = error.response?.data || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload.token;
                state.name = action.payload.name;
                state.id = action.payload.id;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; // Menetapkan user ke state
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(LogOut.fulfilled, (state) => {
                state.user = null;
                state.name = '';
                state.id = null;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
