import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { FETCH_STATUS } from "../../features/quote/utils/constants";
import { obtainQuote } from "../../features/quote/utils/quoteAPI";
import { QuoteState } from "./types";

const initialState: QuoteState = {
  data: null,
  status: FETCH_STATUS.INACTIVE,
};

export const obtainQuoteAsync = createAsyncThunk(
  "quote/obtainQuote",
  async (characterName: string) => {
    try {
      const quote = await obtainQuote(characterName);

      return quote;
    } catch (err) {
      throw err;
    }
  }
);

export const obtainQuoteFromAPI =
  (characterName: string) => (dispatch: AppDispatch) => {
    dispatch(clear());
    dispatch(obtainQuoteAsync(characterName));
  };

export const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    clear: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(obtainQuoteAsync.pending, (state) => {
        state.status = FETCH_STATUS.LOADING;
      })
      .addCase(obtainQuoteAsync.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.INACTIVE;
        state.data = action.payload;
      })
      .addCase(obtainQuoteAsync.rejected, (state) => {
        state.status = FETCH_STATUS.ERROR;
      });
  },
});

export const { clear } = quoteSlice.actions;

export default quoteSlice.reducer;
