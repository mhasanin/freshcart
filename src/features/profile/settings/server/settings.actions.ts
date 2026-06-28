"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { profileSchema, ProfileFormDataType, passwordSchema, PasswordFormDataType } from "../schemas/settings.schema";
import { UpdateProfileResponseType, ChangePasswordResponseType } from "../types/settings.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/users";

async function getAuthHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  return { token };
}

export async function updateProfileAction(profileFormData: ProfileFormDataType) {
  const validationResult = profileSchema.safeParse(profileFormData);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  try {
    const headers = await getAuthHeader();
    const options: AxiosRequestConfig = {
      url: `${BASE_URL}/updateMe`,
      method: "PUT",
      headers,
      data: profileFormData,
    };

    const { data } = await axios.request<UpdateProfileResponseType>(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Profile updated successfully.",
        user: data.user,
      };
    }

    return {
      success: false,
      message: "Failed to update profile",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong. Please try again later.";
    return {
      success: false,
      message: serverMessage,
    };
  }
}

export async function changePasswordAction(passwordFormData: PasswordFormDataType) {
  const validationResult = passwordSchema.safeParse(passwordFormData);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  try {
    const headers = await getAuthHeader();
    const options: AxiosRequestConfig = {
      url: `${BASE_URL}/changeMyPassword`,
      method: "PUT",
      headers,
      data: passwordFormData,
    };

    const { data } = await axios.request<ChangePasswordResponseType>(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Password updated successfully. Logging out...",
      };
    }

    return {
      success: false,
      message: "Failed to change password",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong. Please check your current password.";
    return {
      success: false,
      message: serverMessage,
    };
  }
}