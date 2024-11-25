import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: localStorage.getItem('resources')
        ? JSON.parse(localStorage.getItem('resources')).authToken
        : null,
    loggedUser: localStorage.getItem('resources')
        ? JSON.parse(localStorage.getItem('resources')).loggedUser
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { authToken, loggedUser } = action.payload;
            state.authToken = authToken;
            state.loggedUser = loggedUser;

            // Sync to localStorage
            localStorage.setItem('resources', JSON.stringify({ authToken, loggedUser }));
        },
        logout: (state) => {
            state.authToken = null;
            state.loggedUser = null;

            // Clear localStorage
            localStorage.removeItem('resources');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
