import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Message } from '../../types/lawyer';

interface ChatState {
  conversations: Record<string, Message[]>;
  currentLawyerId: string | null;
}

const initialState: ChatState = {
  conversations: {},
  currentLawyerId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentLawyer: (state, action: PayloadAction<string>) => {
      state.currentLawyerId = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ lawyerId: string; message: Message }>) => {
      const { lawyerId, message } = action.payload;
      if (!state.conversations) {
        state.conversations = {};
      }
      if (!(lawyerId in state.conversations)) {
        state.conversations[lawyerId] = [];
      }
      state.conversations[lawyerId].push(message);
    },
    clearChat: (state) => {
      state.currentLawyerId = null;
    },
    resetChat: () => initialState,
  },
});

export const chatAction = chatSlice.actions;
export const chatReducer = chatSlice.reducer;