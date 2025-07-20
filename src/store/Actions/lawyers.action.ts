import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../Utils/ApiService";
import { Lawyer } from "../../types/lawyer";

export const fetchLawyers = createAsyncThunk<Lawyer[]>(
  'fetchLawyers/lawyersListing',
  async (thunkAPI: any) => {
    try {
      const response = await api.get('/lawyers');
      console.log("🚀 ~ response:", response)
      return response.data;
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return thunkAPI.rejectWithValue(error);
    }
  },
);