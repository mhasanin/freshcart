import type { UserData } from "@/features/auth/store/auth.slice";

export interface UpdateProfileResponseType {
  message: string;
  user: UserData;
}

export interface ChangePasswordResponseType {
  message: string;
  token?: string;
}

export interface SettingsStateType {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}