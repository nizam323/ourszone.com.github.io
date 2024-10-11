import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const isAuthCheck = createAsyncThunk('isAuthCheck', async () => {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
        } else {
            console.log("null");
        }
        return user
    });
})

const initialState = {
    userIsAuth: null,
}

export const isAuth = createSlice({
    name: 'userData',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(isAuthCheck.fulfilled, (state, action) => {
            state.userIsAuth = action.payload
        });
        builder.addCase(isAuthCheck.pending, () => console.log("pending..."));
        builder.addCase(isAuthCheck.rejected, () => console.log("rejected"));
    },
})

export default isAuth.reducer;