import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: string;
}

export const authViewTypes = { CREATE: "CREATE", LOGIN: "LOGIN" };

const initialState: UserState = {
  value: authViewTypes.CREATE,
};

export const authViewSlice = createSlice({
  name: "authView",
  initialState,
  reducers: {
    setToCreate: (state) => {
      state.value = authViewTypes.CREATE;
    },
    setToLogIn: (state) => {
      state.value = authViewTypes.LOGIN;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToCreate, setToLogIn } = authViewSlice.actions;

export default authViewSlice.reducer;
