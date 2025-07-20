import { useDispatch } from "react-redux";
import { store } from "../store/Store";

export type RootStackParamList = {
  Home: undefined;
  Profile: { lawyer: Lawyer };
  Chat: { lawyer: Lawyer };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface Lawyer {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  status: 'Online' | 'Offline' | 'In Meeting';
  experience: number;
  languages: string[];
  education: string;
  consultationFee: number;
  rating: number;
  reviews: number;
  bio?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lawyer';
  timestamp: string;
}

export interface LawyerCardProps {
  lawyer: Lawyer;
  onPress: (lawyer: Lawyer) => void;
}

export interface MessageBubbleProps {
  message: string;
  isCurrentUser: boolean;
  timestamp: string;
  status?: 'delivered' | 'read'; // Optional message status indicator
}