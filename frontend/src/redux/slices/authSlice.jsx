import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: localStorage.getItem('resources')
        ? JSON.parse(localStorage.getItem('resources')).authToken
        : null,
    user: localStorage.getItem('resources')
        ? JSON.parse(localStorage.getItem('resources')).user
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { authToken, user } = action.payload;
            state.authToken = authToken;
            state.user = user;

            // Sync to localStorage
            localStorage.setItem('resources', JSON.stringify({ authToken, user }));
        },
        logout: (state) => {
            state.authToken = null;
            state.user = null;

            // Clear localStorage
            localStorage.removeItem('resources');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
