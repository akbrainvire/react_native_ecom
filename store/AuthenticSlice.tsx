import {createSlice} from '@reduxjs/toolkit';

const Authorize = createSlice({
  name: 'authorized',
  initialState: {
    isAuthorized: false,
    userDetails: {
      email: '',
      password: '',
      firstName: '',
      token: '',
      lastName: '',
      gender: '',
      image: '',
      savedAddresses: [],
    },
    userOptions: {
      language: 'English',
      darkMode: false,
      notification: false,
    },
  },
  reducers: {
    authorize: (state: any, action) => {
      state.isAuthorized = true;
      state.userDetails = action.payload;

      //Adding a dummy saved address
      const dummyAddress = {
        fullName: 'John Doe',
        phoneNumber: '1234567890',
        pincode: '12345',
        country: {name: 'USA'},
        state: {name: 'California'},
        city: {name: 'Los Angeles'},
        houseNo: '123',
        area: 'Downtown',
        type: 'Home',
        id: 1,
      };
      const dummyAddress2 = {
        fullName: 'Ak',
        phoneNumber: '1234567890',
        pincode: '12345',
        country: {name: 'India'},

        state: {name: 'Madhya Pradesh'},
        city: {name: 'Bhopal'},
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

    addAddressForUser: (state: any, action) => {
      state.userDetails.savedAddresses.push(action.payload);
    },
    updateUserOptions: (state: any, action) => {
      state.userOptions = {...state.userOptions, ...action.payload};
    },
  },
});

export const {authorize, logout, addAddressForUser, updateUserOptions} =
  Authorize.actions;
export default Authorize.reducer;
