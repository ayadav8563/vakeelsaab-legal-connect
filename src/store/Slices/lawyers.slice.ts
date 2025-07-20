import {createSlice} from '@reduxjs/toolkit';
import { Lawyer, fetchLawyers } from '../Actions/lawyers.action';

interface LawyersState {
  lawyers: Lawyer[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LawyersState = {
  lawyers: [],
  loading: 'idle',
  error: null,
};

const lawyersSlice = createSlice({
  name: 'lawyers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawyers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.lawyers = action.payload;
      })
      .addCase(fetchLawyers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const lawyersReducer = lawyersSlice.reducer;
export const lawyersActions = lawyersSlice.actions;