import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// State awal untuk slice otentikasi
const initialState = {
    user: null,             // Menyimpan data pengguna
    isError: false,         // Menunjukkan jika terjadi kesalahan selama proses
    isSuccess: false,       // Menunjukkan jika proses berhasil
    isLoading: false,       // Menunjukkan jika proses sedang berlangsung
    message: ""             // Menyimpan pesan, seperti pesan kesalahan
}

// Aksi thunk asinkron untuk login pengguna
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data; // Mengembalikan data pengguna jika login berhasil
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg; // Mendapatkan pesan kesalahan dari respon
            return thunkAPI.rejectWithValue(message); // Menolak thunk dengan pesan kesalahan
        }
    }
});

// Aksi thunk asinkron untuk mendapatkan data pengguna saat ini
export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data; // Mengembalikan data pengguna jika permintaan berhasil
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg; // Mendapatkan pesan kesalahan dari respon
            return thunkAPI.rejectWithValue(message); // Menolak thunk dengan pesan kesalahan
        }
    }
});

// Aksi thunk asinkron untuk logout pengguna
export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout'); // Melakukan permintaan logout
});

// Membuat slice untuk otentikasi
export const authSlice = createSlice({
    name: "auth", // Nama slice
    initialState, // State awal untuk slice
    reducers: {
        // Reducer untuk mereset state
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Menangani state pending untuk aksi LoginUser
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true; // Menetapkan state loading menjadi true
            console.log('LoginUser pending...'); // Tambahkan console log di sini
        });
        // Menangani state fulfilled untuk aksi LoginUser
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isSuccess = true;  // Menetapkan state sukses menjadi true
            state.user = action.payload; // Menyimpan data pengguna
            console.log('LoginUser fulfilled:', action.payload); // Tambahkan console log di sini
        });
        // Menangani state rejected untuk aksi LoginUser
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isError = true;    // Menetapkan state error menjadi true
            state.message = action.payload; // Menyimpan pesan kesalahan
            console.error('LoginUser rejected:', action.payload); // Tambahkan console log di sini
        });

        // Menangani state pending untuk aksi getMe
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true; // Menetapkan state loading menjadi true
            console.log('getMe pending...'); // Tambahkan console log di sini
        });
        // Menangani state fulfilled untuk aksi getMe
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isSuccess = true;  // Menetapkan state sukses menjadi true
            state.user = action.payload; // Menyimpan data pengguna
            console.log('getMe fulfilled:', action.payload); // Tambahkan console log di sini
        });
        // Menangani state rejected untuk aksi getMe
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isError = true;    // Menetapkan state error menjadi true
            state.message = action.payload; // Menyimpan pesan kesalahan
            console.error('getMe rejected:', action.payload); // Tambahkan console log di sini
        });

        // Menangani state pending untuk aksi LogOut (jika ada)
        builder.addCase(LogOut.pending, (state) => {
            state.isLoading = true; // Menetapkan state loading menjadi true
            console.log('LogOut pending...'); // Tambahkan console log di sini
        });
        // Menangani state fulfilled untuk aksi LogOut (jika ada)
        builder.addCase(LogOut.fulfilled, (state) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isSuccess = true;  // Menetapkan state sukses menjadi true
            state.user = null; // Menghapus data pengguna setelah logout
            console.log('LogOut fulfilled'); // Tambahkan console log di sini
        });
        // Menangani state rejected untuk aksi LogOut (jika ada)
        builder.addCase(LogOut.rejected, (state, action) => {
            state.isLoading = false; // Menetapkan state loading menjadi false
            state.isError = true;    // Menetapkan state error menjadi true
            state.message = action.payload; // Menyimpan pesan kesalahan
            console.error('LogOut rejected:', action.payload); // Tambahkan console log di sini
        });
    }
});

// Mengekspor aksi reset dari slice
export const { reset } = authSlice.actions;
// Mengekspor reducer dari slice
export default authSlice.reducer;
