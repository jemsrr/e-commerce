const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLogin: false,
  email:""
};
const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
    },
  },
});

export const { userLogin } = userLoginSlice.actions;
export default userLoginSlice.reducer;
