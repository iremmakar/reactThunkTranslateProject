import { createSlice } from "@reduxjs/toolkit";
import { getAnswer, getLanguages } from "./actions";

const initialState = {
  languages: [],
  isLoading: true,
  isError: [],
  answer: "",
};

const translateSlice = createSlice({
  name: "translateSlice",
  initialState,
  extraReducers: {
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    [getLanguages.rejected]: (state) => {
      state.isError = "Dilleri alırken bir hata oluştu";
    },

    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [getAnswer.fulfilled]: (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.answer = action.payload);
    },
    [getAnswer.rejected]: (state) => {
      state.isError = "Çevirirken bir hata oluştu";
    },
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});

export default translateSlice.reducer;

export const { clearAnswer } = translateSlice.actions;
