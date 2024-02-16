import {createSlice} from '@reduxjs/toolkit';

const Authorize = createSlice({
  name: 'authorized',
  initialState: {
    isAuthorized: false,
    userDetails: {
      email: '',
      password: '',
      savedAddresses: [],
    },
  },
  reducers: {
    authorize: (state: any, action) => {
      state.isAuthorized = true;
      state.userDetails.email = action.payload.email;
      state.userDetails.password = action.payload.password;

      //Adding a dummy saved address
      const dummyAddress = {
        fullName: 'John Doe',
        phoneNumber: '1234567890',
        pincode: '12345',
        state: 'California',
        city: 'Los Angeles',
        houseNo: '123',
        area: 'Downtown',
        type: 'Home',
        id: 1,
      };
      const dummyAddress2 = {
        fullName: 'Ak',
        phoneNumber: '1234567890',
        pincode: '12345',
        state: 'India',
        city: 'Bhopal',
        houseNo: '123',
        area: 'Uptown',
        type: 'Office',
        id: 2,
      };
      state.userDetails.savedAddresses.push(dummyAddress2);

      state.userDetails.savedAddresses.push(dummyAddress);
    },
    logout: (state: any) => {
      state.isAuthorized = false;
      state.userDetails = {
        email: '',
        password: '',
        savedAddress: [],
      };
    },
  },
});

export const {authorize, logout} = Authorize.actions;
export default Authorize.reducer;
