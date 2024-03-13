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
        country: {
          currency: 'USD',
          flag: '🇺🇸',
          isoCode: 'US',
          latitude: 38.0,
          longitude: -97.0,
          name: 'United States',
          phonecode: '1',
        },
        state: {name: 'California'},
        city: {name: 'Los Angeles', latitude: 34.0549, longitude: -118.2426},
        houseNo: '123',
        area: 'Downtown',
        type: 'Home',
        id: 1,
      };
      const dummyAddress2 = {
        fullName: 'Ak',
        phoneNumber: '1234567890',
        pincode: '12345',
        country: {
          currency: 'INR',
          flag: '🇮🇳',
          isoCode: 'IN',
          latitude: 21.0,
          longitude: 78.0,
          name: 'India',
          phonecode: '91',
        },

        state: {name: 'Madhya Pradesh'},
        city: {name: 'Bhopal', latitude: 23.259933, longitude: 77.412613},
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
