import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: string | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearUserData: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
