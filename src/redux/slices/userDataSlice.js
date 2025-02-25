import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app);

export const isAuthCheck = createAsyncThunk('isAuthCheck', () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // let userData= {
                    // uid:user.uid
                // }
                resolve({uid:user.uid});
            } else {
                reject("rejected")
            }
        })
    });
})

const initialState = {
    userIsAuth: null,
}

export const isAuth = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(isAuthCheck.fulfilled, (state, action) => {
            // console.log('action',action);
            
            state.userIsAuth = action.payload
            console.log("success")
        });
        builder.addCase(isAuthCheck.pending, () => console.log("pending..."));
        builder.addCase(isAuthCheck.rejected, () => console.log("rejected"));
    },
})

export const { } = isAuth.actions

export default isAuth.reducer;