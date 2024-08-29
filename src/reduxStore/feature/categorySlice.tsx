import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    selectedCategory: string,
}


const initialState: CategoryState = {
    selectedCategory: 'all',
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string> ) => {
            state.selectedCategory = action.payload;
        },

        resetCategory: (state) => {
            state.selectedCategory = 'all';
        }
    }
})

export const { setSelectedCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;