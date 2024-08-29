import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
    name: string;
    userId: string;
    role: string;
}

interface SaveUserDataState {
    userData: UserData | null;
    isLoading: boolean;
    error: string | null;

}

const initialState: SaveUserDataState = {
    userData: null,
    isLoading: false,
    error: null,
};

const saveUserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        saveUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        }
    },
});

export const {
    saveUserData
} = saveUserDataSlice.actions;

export default saveUserDataSlice.reducer;
