import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk("getTodos", async (payload, thunkAPI) => {
  try {
    const response = await axios.get(process.env.REACT_APP_TODOS_URL);
    console.log("response", response.data);

    // toolkit에서 제공하는 API
    // Promise -> resolve(= 네트워크 요청이 성공한 경우) -> dispatch 해주는 기능을 가진 API
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log("error", error);

    // toolkit에서 제공하는 API
    // Promise -> reject(= 네트워크 요청이 실패한 경우) -> dispatch 해주는 기능을 가진 API
    return thunkAPI.rejectWithValue(error);
  }
});
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state, action) => {
        // 통신이 아직 진행중일 때
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = action.payload;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

// export const {} = todosSlice.actions;

export default todosSlice.reducer;
