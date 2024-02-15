import {createSlice} from '@reduxjs/toolkit';

const Authorize = createSlice({
  name: 'authorized',
  initialState: {
    isAuthorized: false,
    userDetails: {
      email: '',
      password: '',
    },
  },
  reducers: {
    authorize: (state: any, action) => {
      state.isAuthorized = true;
      state.userDetails.email = action.payload.email;
      state.userDetails.password = action.payload.password;
    },
    logout: (state: any) => {
      state.isAuthorized = false;
      state.userDetails = {
        email: '',
        password: '',
      };
    },
  },
});

export const {authorize, logout} = Authorize.actions;
export default Authorize.reducer;
