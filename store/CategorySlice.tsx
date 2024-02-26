import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchCategories: any = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    filterCategories: [],
    loading: false,
    error: '',
  },
  reducers: {
    filterCategoriesAction: (state: any, action: any) => {
      if (action.payload !== '') {
        const filteredCategories = state.categories.filter(
          (category: any) =>
            category.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1,
        );

        state.filterCategories = filteredCategories;
      } else {
        state.filterCategories = [];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : 'Unexpected Error Occured';
      });
  },
});

export const {filterCategoriesAction} = categorySlice.actions;

export default categorySlice.reducer;
