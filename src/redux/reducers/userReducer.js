import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userInfo: {
        id: '',
        name: '',
        email: '',
    },
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = initialState.user;
        },
    },
});

export const { login, logout } = user.actions;
export default user.reducer;